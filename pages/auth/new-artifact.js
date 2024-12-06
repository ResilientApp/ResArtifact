import React, { useState, useEffect, useRef } from "react";
import ResVaultSDK from "resvault-sdk";
import NotificationModal from "pages/NotificationModal";
import TransactionLayout from "layouts/Transaction.js";

const TransactionForm = ({ onLogout, token }) => {
  const [name, setName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [origin, setOrigin] = useState("");
  const [originYear, setOriginYear] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [curator, setCurator] = useState("");
  const [curatorId, setCuratorId] = useState("");
  const [owner, setOwner] = useState(""); 
  const [recipient, setRecipient] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const sdkRef = useRef(null);

  const fixedAmount = "44";

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

    const parsedData = {
      name,
      uniqueId,
      origin,
      originYear,
      description,
      condition,
      curator,
      curatorId,
      owner, // Changed from museumId to owner
      imageUrl,
      date,
    };

    if (sdkRef.current) {
      sdkRef.current.sendMessage({
        type: "commit",
        direction: "commit",
        amount: fixedAmount,
        data: parsedData,
        recipient: recipient,
        metadata: "", 
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

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border border-solid border-lightBlue-200 border-5"
            // style={{
            //   background: "url('/img/wall-artifact.jpg')",
            //   backgroundSize: 'cover',
            // }}
            >
              <div className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                <p>Add a New Artifact</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 px-4 lg:px-10 py-10">
                {/* Name and Unique ID */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="name" className="block text-gray-700 font-medium">
                      Artifact Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="uniqueId" className="block text-gray-700 font-medium">
                      Unique ID
                    </label>
                    <input
                      type="text"
                      id="uniqueId"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={uniqueId}
                      onChange={(e) => setUniqueId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Origin and Origin Year */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="origin" className="block text-gray-700 font-medium">
                      Place of Origin
                    </label>
                    <input
                      type="text"
                      id="origin"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="originYear" className="block text-gray-700 font-medium">
                      Origin Year
                    </label>
                    <input
                      type="number"
                      id="originYear"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={originYear}
                      onChange={(e) => setOriginYear(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-gray-700 font-medium">
                    Artifact Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Condition */}
                <div>
                  <label htmlFor="condition" className="block text-gray-700 font-medium">
                    Condition
                  </label>
                  <input
                    type="text"
                    id="condition"
                    className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </div>

                {/* Curator and Curator ID */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="curator" className="block text-gray-700 font-medium">
                      Authenticated By
                    </label>
                    <input
                      type="text"
                      id="curator"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={curator}
                      onChange={(e) => setCurator(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="curatorId" className="block text-gray-700 font-medium">
                      Authenticator ID
                    </label>
                    <input
                      type="text"
                      id="curatorId"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={curatorId}
                      onChange={(e) => setCuratorId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Owner and Recipient */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="owner" className="block text-gray-700 font-medium">
                      Owner
                    </label>
                    <input
                      type="text"
                      id="owner"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="recipient" className="block text-gray-700 font-medium">
                      Owner Public Key
                    </label>
                    <input
                      type="text"
                      id="recipient"
                      className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="imageUrl" className="block text-gray-700 font-medium">
                    Image Link
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>

                {/* Transaction Date */}
                <div>
                  <label htmlFor="transactionDate" className="block text-gray-700 font-medium">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    id="transactionDate"
                    className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="flex justify-center items-center flex-col mt-4">
                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blueGray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blueGray-500 transition ease-in"
                  >
                    Submit Transaction
                  </button>
                </div>
                
                <div className="mt-4">
                  <a
                    href="auth/login"  
                    className="bg-blueGray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 text-center inline-block hover:bg-blueGray-500 transition ease-in"
                  >
                    Go Back
                  </a>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
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

