import React, { useState } from 'react';

import TransactionLayout from "layouts/Transaction.js";

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
    <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col justify-center items-center min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <h2 className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                  Retrieve Transaction
                </h2>
                <div className="form-container flex flex-col">
                <form onSubmit={handleRetrieve}>
                  <div className="form-group mb-3 mt-6">
                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  </div>
                  <div className="form-group text-center">
                  <button type="submit"
                  className="option-button bg-blueGray-700 mt-3 hover:bg-blueGray-400 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 "
                  >Retrieve Transaction</button>
                  </div>
                </form>
                </div>

                {transactionDetails && (
                  <div>
                    <h4>Transaction Details</h4>
                    <p>ID: {transactionDetails.id}</p>
                    <p>Amount: {transactionDetails.amount}</p>
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="/auth/login"
                      className="text-blueGray-200 option-button"
                    >
                      <small>Back to Dashboard</small>
                    </a>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionRetriever;

TransactionRetriever.layout = TransactionLayout;