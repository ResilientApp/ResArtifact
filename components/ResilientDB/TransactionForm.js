import React, { useState, useEffect, useRef } from 'react';
import ResVaultSDK from 'resvault-sdk';
import NotificationModal from './NotificationModal';

const TransactionForm = ({ onLogout, token }) => {
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [transactions, setTransactions] = useState([]);


  const sdkRef = useRef(null);

  if (!sdkRef.current) {
    sdkRef.current = new ResVaultSDK();
  }
  console.log('Transactions:', transactions);  // Log transactions state

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
          console.log("Success")
        } else {
          setModalTitle('Transaction Failed');
          setModalMessage(
            'Transaction failed: ' +
              (message.data.error || JSON.stringify(message.data.errors))
          );
          console.log(message.data.error)
        }
        setShowModal(true);
      }
    };

    sdk.addMessageListener(messageHandler);

    return () => {
      sdk.removeMessageListener(messageHandler);
    };
  }, []);

  // temp fetch until i figure where to put it
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const result = await response.json();
        
        if (result.success) {
          setTransactions(result.transactions); // Save transactions to state
        } else {
          console.error('Failed to fetch transactions:', result.error);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Run once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          data,
          recipient,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setModalTitle('Success');
        setModalMessage(`Transaction successful! ID: ${result.transactionId}`);
      } else {
        setModalTitle('Error');
        setModalMessage(result.error || 'Transaction failed.');
      }
      console.log(result)
      setShowModal(true);
    } catch (error) {
      console.error('Transaction submission error:', error);
      setModalTitle('Error');
      setModalMessage('An error occurred while submitting the transaction.');
      setShowModal(true);
    }
  

    if (!recipient) {
      setModalTitle('Validation Error');
      setModalMessage('Please enter a recipient address.');
      setShowModal(true);
      console.log("Modal should display due to missing recipient.");
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
    console.log("Show Modal State:", showModal);
  }, [showModal]);

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
          <div className="transactions-list">
            <h3>Recent Transactions</h3>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  Amount: {transaction.amount}, Recipient: {transaction.recipient}, Date: {transaction.date}
                </li>
              ))}
            </ul>
          </div>
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