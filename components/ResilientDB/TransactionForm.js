import React, { useState, useEffect, useRef } from 'react';
import ResVaultSDK from 'resvault-sdk';
import NotificationModal from './NotificationModal';

const TransactionForm = ({ onLogout, token }) => {
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');
  const [recipient, setRecipient] = useState('');
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const sdkRef = useRef(null);

  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }

  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk) return;

    const messageHandler = (event) => {
      const message = event.data;

      if (
        message &&
        message.type === 'FROM_CONTENT_SCRIPT' &&
        message.data &&
        message.data.success !== undefined
      ) {
        if (message.data.success) {
          setModalTitle('Success');
          setModalMessage('Transaction successful! ID: ' + message.data.data.postTransaction.id);
          console.log("message data: ", message.data) //data: {post transaction: id:#}, success: true
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
    console.log("recipient: ", recipient) //recipient: 4fGVSdVxwDjYVFyY53ahNUYf2RUtaiTLLaSU3JVdZo8V (recipient address input)
    //recipient necessary for transaction to be submitted successfully
    //json not necessary for transaction to be submitted successfully, amount and recipient not pulled from json (basically useless)
    if (!recipient) {
      setModalTitle('Validation Error');
      setModalMessage('Please enter a recipient address.');
      setShowModal(true);
      return;
    }

    let parsedData = {};
    if (data.trim() !== '') {
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        setModalTitle('Validation Error');
        setModalMessage(
          'Invalid JSON format in the data field. Please check and try again.'
        );
        setShowModal(true);
        return;
      }
    }
  
    if (sdkRef.current) {
      sdkRef.current.sendMessage({
        type: 'commit',
        direction: 'commit',
        amount: amount,
        data: parsedData,
        recipient: recipient,
      });
      // console.log("ammount: ", amount) //amount: 10 (amount input), not necessary for transaction to be submitted successfully but amount=null
      //if only json submitted, the amount is not taken from json, only from amount input
    } else {
      setModalTitle('Error');
      setModalMessage('SDK is not initialized.');
      setShowModal(true);
    }
  };

  // const handleRetrieve = (e) => {
  //   e.preventDefault();
  //   console.log("id: ", id) //recipient: 4fGVSdVxwDjYVFyY53ahNUYf2RUtaiTLLaSU3JVdZo8V (recipient address input)
  //   //recipient necessary for transaction to be submitted successfully
  //   //json not necessary for transaction to be submitted successfully, amount and recipient not pulled from json (basically useless)
  //   if (!id) {
  //     setModalTitle('Validation Error');
  //     setModalMessage('Please enter a id.');
  //     setShowModal(true);
  //     return;
  //   }
  //   // console.log("getTransaction: ", getTransaction(id))
    
  //   console.log("sdkRef.current: ", sdkRef.current)
  //   if (sdkRef.current) {
  //     sdkRef.current.sendMessage({
  //       type: 'getTransaction',
  //       direction: 'getTransaction',
  //       id: id,
  //       amount: amount,
  //     });
  //     console.log("amount: ", amount) //amount: 10 (amount input), not necessary for transaction to be submitted successfully but amount=null
  //     //if only json submitted, the amount is not taken from json, only from amount input
  //   } else {
  //     setModalTitle('Error');
  //     setModalMessage('SDK is not initialized.');
  //     setShowModal(true);
  //   }
  // };
  // Define the function to fetch transaction by ID using GraphQL API
  const fetchTransactionById = async (transactionId) => {
    const query = `
      query getTransaction($id: ID!) {
        getTransaction(id: $id) {
          id
          amount
        }
      }
    `;

    const variables = { id: transactionId };

    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();
      // console.log("result: ", result)
      // return result.data.transaction;
      // Log the entire response to check for errors or null fields
    console.log("GraphQL response:", result);

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return null;
    }

    if (!result.data || !result.data.getTransaction) {
      console.error("No transaction found in response:", result.data);
      return null;
    }

    return result.data.getTransaction;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      return null;
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();

    if (!id) {
      setModalTitle('Validation Error');
      setModalMessage('Please enter a transaction ID.');
      setShowModal(true);
      return;
    }

    const transaction = await fetchTransactionById(id);
    if (transaction) {
      setModalTitle('Transaction Retrieved');
      setModalMessage(`ID: ${transaction.id}\nAmount: ${transaction.amount}\n`);
    } else {
      setModalTitle('Error');
      setModalMessage('Could not retrieve the transaction.');
    }
    setShowModal(true);
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="heading">Submit Transaction</h2>
            <button
              type="button"
              className="btn btn-danger logout-button"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your amount here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your data here (JSON)"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipient address here"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary button">
                Submit Transaction
              </button>
            </div>
          </form>
          <form onSubmit={handleRetrieve}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your id here"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary button">
                Retrieve Transaction
              </button>
            </div>
          </form>
        </div>
      </div>

      <NotificationModal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TransactionForm;