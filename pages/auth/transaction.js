  import React, { useState, useEffect, useRef } from 'react';
  import ResVaultSDK from 'resvault-sdk';
  import NotificationModal from 'pages/NotificationModal';

  const TransactionForm = ({ onLogout, token }) => {
  
    const [name, setName] = useState('');
    const [curatorID, setCuratorID] = useState('');
    const [museumID, setMuseumID] = useState('');
    const [recipient, setRecipient] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
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
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `mutation { generateKeys { publicKey privateKey } }`,
              variables: {},
            })
          });
          const result = await response.json();
          if (result?.data?.generateKeys) {
            setRecipientPublicKey(result.data.generateKeys.publicKey);
          } else {
            throw new Error('Failed to initialize public key');
          }
        } catch (error) {
          console.error('Error initializing public key:', error);
        }
      };

      initializePublicKey();

      const messageHandler = (event) => {
        const message = event.data;

        if (
          message &&
          message.type === 'FROM_CONTENT_SCRIPT' &&
          message.data &&
          message.data.success !== undefined
        ) {
          if (message.data.success) {
            setTransactionId(message.data.data.postTransaction.id);
            setModalTitle('Success');
            setModalMessage('Transaction successful! ID: ' + message.data.data.postTransaction.id);
          } else {
            setModalTitle('Transaction Failed');
            setModalMessage(
              'Transaction failed: ' +
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
        setModalTitle('Validation Error');
        setModalMessage('Please ensure both recipient and public key are initialized.');
        setShowModal(true);
        return;
      }

      const parsedData = {
        name,
        curatorID,
        museumID,
      };

      if (sdkRef.current) {
        sdkRef.current.sendMessage({
          type: 'commit',
          direction: 'commit',
          amount: fixedAmount,
          data: parsedData,  
          recipient: recipient,
        });
      } else {
        setModalTitle('Error');
        setModalMessage('SDK is not initialized.');
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
        <div className="pt-16 bg-gray-50 h-full max-h-screen flex items-center justify-center">
          <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-4xl font-semibold text-center text-blue-800 mb-8">
              Add Artifact
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Artifact Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Curator ID"
                  value={curatorID}
                  onChange={(e) => setCuratorID(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Museum ID"
                  value={museumID}
                  onChange={(e) => setMuseumID(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Recipient's Public Key"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-500 text-black rounded-lg shadow-md hover:bg-blue-600"
                >
                  Submit Transaction
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-100"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </form>
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

  export default TransactionForm;

