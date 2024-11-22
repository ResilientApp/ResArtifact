import React, { useState } from "react";
import TransactionLayout from "layouts/Transaction.js";

const TransactionRetriever = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [curatorId, setCuratorId] = useState("");
  const [museumId, setMuseumId] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [transactions, setTransactions] = useState(null);
  const [assets, setAssets] = useState([]);

  const fetchFilteredTransactions = async () => {
    let query = "";
    let variables = {};

    if (searchCriteria === "name") {
      query = `
        query getFilteredNameTransactions($name: String!) {
          getFilteredNameTransactions(filter: { name: $name }) {
            asset
          }
        }
      `;
      variables = { name };
    } else if (searchCriteria === "origin") {
      query = `
        query getFilteredOriginTransactions($origin: String!) {
          getFilteredOriginTransactions(filter: { origin: $origin }) {
            asset
          }
        }
      `;
      variables = { origin };
    } else if (searchCriteria === "curatorId") {
      query = `
        query getFilteredCuratorTransactions($curatorId: String!) {
          getFilteredCuratorTransactions(filter: { curatorId: $curatorId }) {
            asset
          }
        }
      `;
      variables = { curatorId };
    } else if (searchCriteria === "museumId") {
      query = `
        query getFilteredMuseumTransactions($museumId: String!) {
          getFilteredMuseumTransactions(filter: { museumId: $museumId }) {
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
        const fetchedTransactions = result.data[Object.keys(result.data)[0]];
        setTransactions(fetchedTransactions);

        // Extract and store assets
        const fetchedAssets = fetchedTransactions.map((transaction) => transaction.asset);
        setAssets(fetchedAssets);
      } else {
        setTransactions(null);
        setAssets([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    await fetchFilteredTransactions();
  };

  const extractInfo = (asset) => {
    // Convert asset object to string
    const assetString = JSON.stringify(asset);

    // Regex to match all key-value pairs (key: 'value')
    const regex = /\'([a-zA-Z0-9]+)\'\s*:\s*\'([^\']+)\'/g;
    const matches = [];
    let match;

    // Find all key-value pairs
    while ((match = regex.exec(assetString)) !== null) {
      const key = match[1]; // The key (e.g., 'name', 'origin')
      const value = match[2]; // The value (e.g., 'g', 'mumbai')

      matches.push({ key, value });
    }

    return matches;
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <h2 className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                Search Artifacts
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
                    Search
                  </button>
                </div>
              </form>

              {assets.length > 0 && (
                <div className="mt-10">
                  <h4 className="text-blueGray-700 font-bold text-lg">Artifacts</h4>
                  {assets.map((asset, index) => {
                    const assetInfo = extractInfo(asset);  // Extract all key-value pairs from the asset
                    return (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-sm mb-4">
                        {/* Display all key-value pairs */}
                        <pre className="text-sm">
                          {assetInfo.map((info, i) => (
                            <div key={i}>
                              <strong>{info.key}: </strong>{info.value}
                            </div>
                          ))}
                        </pre>
                      </div>
                    );
                  })}
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

