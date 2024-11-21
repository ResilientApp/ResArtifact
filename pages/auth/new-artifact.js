import React, { useState, useEffect, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import NotificationModal from "pages/NotificationModal";
import TransactionLayout from "layouts/Transaction.js";

const TransactionForm = ({ onLogout, token }) => {
  
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [curatorId, setCuratorId] = useState("");
  const [museumId, setMuseumId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const sdkRef = useRef(null);

  const fixedAmount = "1";

  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }

  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk) return;

    const initializePublicKey = async () => {
      try {
        const response = await fetch("http://localhost:8000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `mutation { generateKeys { publicKey privateKey } }`,
            variables: {},
          }),
        });
        const result = await response.json();
        if (result?.data?.generateKeys) {
          setRecipientPublicKey(result.data.generateKeys.publicKey);
        } else {
          throw new Error("Failed to initialize public key");
        }
      } catch (error) {
        console.error("Error initializing public key:", error);
      }
    };

    initializePublicKey();

    const messageHandler = (event) => {
      const message = event.data;

      if (
        message &&
        message.type === "FROM_CONTENT_SCRIPT" &&
        message.data &&
        message.data.success !== undefined
      ) {
        if (message.data.success) {
          setTransactionId(message.data.data.postTransaction.id);
          setModalTitle("Success");
          setModalMessage("Transaction successful! ID: " + message.data.data.postTransaction.id);
        } else {
          setModalTitle("Transaction Failed");
          setModalMessage(
            "Transaction failed: " +
              (message.data.error || JSON.stringify(message.data.errors))
          );
        }
        setShowModal(true);
      }
    };

    sdk.addMessageListener(messageHandler);

    return () => {
      sdk.removeMessageListener(messageHandler);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipient || !recipientPublicKey) {
      setModalTitle("Validation Error");
      setModalMessage("Please ensure both recipient and public key are initialized.");
      setShowModal(true);
      return;
    }

    // Construct the JSON object
    const parsedData = {
      name,
      origin,
      description,
      condition,
      curatorId,
      museumId,
    };

    if (sdkRef.current) {
      sdkRef.current.sendMessage({
        type: "commit",
        direction: "commit",
        amount: fixedAmount,
        data: parsedData,
        recipient: recipient,
      });
    } else {
      setModalTitle("Error");
      setModalMessage("SDK is not initialized.");
      setShowModal(true);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (transactionId) {
      const uniqueLink = `transaction-page.html?transaction=${transactionId}&key=${recipientPublicKey}`;
      window.location.href = uniqueLink;
    }
  }, [transactionId]);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                <p>Add a New Artifact</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 px-4 lg:px-10 py-10">
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Artifact Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
                <textarea
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Artifact Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Curator ID"
                  value={curatorId}
                  onChange={(e) => setCuratorId(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Museum ID"
                  value={museumId}
                  onChange={(e) => setMuseumId(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Recipient's Public Key"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />

                <div className="flex justify-between items-center mt-8">
                  <button
                    type="submit"
                    className="px-8 py-2 bg-blue-500 text-black rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Add Artifact
                  </button>
                  <a
                    href="/auth/login"
                    className="text-blueGray-200 option-button px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                  >
                    Back to Dashboard
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <NotificationModal
          title={modalTitle}
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

TransactionForm.layout = TransactionLayout;

export default TransactionForm;

