import React, { useState } from "react";
import TransactionLayout from "layouts/Transaction.js";

const TransactionRetriever = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState(""); // For origin museum ID
  const [curatorId, setCuratorId] = useState("");
  const [museumId, setMuseumId] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name"); // Default search by name
  const [transactions, setTransactions] = useState(null);

  const fetchFilteredTransactions = async () => {
    let query = "";
    let variables = {};

    if (searchCriteria === "name") {
      query = `
        query getFilteredNameTransactions($name: String!) {
          getFilteredNameTransactions(filter: { name: $name }) {
            id
            version
            amount
            metadata
            operation
            asset
            publicKey
            uri
            type
          }
        }
      `;
      variables = { name };
    } else if (searchCriteria === "origin") {
      query = `
        query getFilteredOriginTransactions($origin: String!) {
          getFilteredOriginTransactions(filter: { origin: $origin }) {
            id
            version
            amount
            metadata
            operation
            asset
            publicKey
            uri
            type
          }
        }
      `;
      variables = { origin };
    } else if (searchCriteria === "curatorId") {
      query = `
        query getFilteredCuratorTransactions($curatorId: String!) {
          getFilteredCuratorTransactions(filter: { curatorId: $curatorId }) {
            id
            version
            amount
            metadata
            operation
            asset
            publicKey
            uri
            type
          }
        }
      `;
      variables = { curatorId };
    } else if (searchCriteria === "museumId") {
      query = `
        query getFilteredMuseumTransactions($museumId: String!) {
          getFilteredMuseumTransactions(filter: { museumId: $museumId }) {
            id
            version
            amount
            metadata
            operation
            asset
            publicKey
            uri
            type
          }
        }
      `;
      variables = { museumId };
    }

    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });
      const result = await response.json();
      if (result.data) {
        setTransactions(result.data[Object.keys(result.data)[0]]);
      } else {
        setTransactions(null);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    await fetchFilteredTransactions();
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <h2 className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                Retrieve Filtered Transactions
              </h2>
              <form onSubmit={handleRetrieve} className="mt-6">
                <div className="form-group mb-6">
                  <input
                    type="text"
                    placeholder={
                      searchCriteria === "name"
                        ? "Enter Name"
                        : searchCriteria === "origin"
                        ? "Enter Origin Museum ID"
                        : searchCriteria === "curatorId"
                        ? "Enter Curator ID"
                        : "Enter Museum ID"
                    }
                    value={
                      searchCriteria === "name"
                        ? name
                        : searchCriteria === "origin"
                        ? origin
                        : searchCriteria === "curatorId"
                        ? curatorId
                        : museumId
                    }
                    onChange={(e) => {
                      if (searchCriteria === "name") {
                        setName(e.target.value);
                      } else if (searchCriteria === "origin") {
                        setOrigin(e.target.value);
                      } else if (searchCriteria === "curatorId") {
                        setCuratorId(e.target.value);
                      } else {
                        setMuseumId(e.target.value);
                      }
                    }}
                    className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Dropdown for selecting search criteria */}
                <div className="form-group mb-6">
                  <select
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                    className="form-control px-4 py-2 rounded-lg shadow-sm w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Use Name</option>
                    <option value="origin">Use Origin Museum ID</option>
                    <option value="curatorId">Use Curator ID</option>
                    <option value="museumId">Use Museum ID</option>
                  </select>
                </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="bg-blueGray-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blueGray-500 transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    Retrieve Transactions
                  </button>
                </div>
              </form>

              {transactions && transactions.length > 0 && (
                <div className="mt-10">
                  <h4 className="text-blueGray-700 font-bold text-lg">Transaction Details</h4>
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-4 bg-white rounded-lg shadow-sm mb-4"
                    >
                      <p className="text-sm">ID: {transaction.id}</p>
                      <p className="text-sm">Version: {transaction.version}</p>
                      <p className="text-sm">Amount: {transaction.amount}</p>
                      <p className="text-sm">Metadata: {transaction.metadata}</p>
                      <p className="text-sm">Operation: {transaction.operation}</p>
                      <p className="text-sm">Asset: {transaction.asset}</p>
                      <p className="text-sm">Public Key: {transaction.publicKey}</p>
                      <p className="text-sm">URI: {transaction.uri}</p>
                      <p className="text-sm">Type: {transaction.type}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <a
                href="/auth/login"
                className="text-blueGray-700 font-bold hover:text-blueGray-500"
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

// Add the layout
TransactionRetriever.layout = TransactionLayout;

