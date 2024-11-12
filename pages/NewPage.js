import React, { useState } from 'react';

const TransactionRetriever = () => {
  const [transactionId, setTransactionId] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);

  const fetchTransactionById = async (id) => {
    const query = `
      query getTransaction($id: ID!) {
        getTransaction(id: $id) {
          id
          amount
          asset
        }
      }
    `;
    const variables = { id };

    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });
      const result = await response.json();
      if (result.data) {
        setTransactionDetails(result.data.getTransaction);
      } else {
        setTransactionDetails(null);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    if (transactionId) {
      await fetchTransactionById(transactionId);
    }
  };

  return (
    <div>
      <h3>Retrieve Transaction</h3>
      <form onSubmit={handleRetrieve}>
        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
        <button type="submit">Retrieve Transaction</button>
      </form>

      {transactionDetails && (
        <div>
          <h4>Transaction Details</h4>
          <p>ID: {transactionDetails.id}</p>
          <p>Amount: {transactionDetails.amount}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionRetriever;

