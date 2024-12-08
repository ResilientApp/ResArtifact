  import { useState, useEffect } from "react";
  import TransactionLayout from "layouts/Transaction.js";

  export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchType, setSearchType] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const publicKey = "8QkgpLEShfkMEruc5SubiRPN3JagYWLvFAUG9Jy3bay4";

    const handleSearch = async () => {
      console.log("Search triggered");
      console.log("Search Type:", searchType);
      console.log("Search Value:", searchValue);

      setLoading(true);
      setError(null);
      setFilteredTransactions([]);

      try {
        const response = await fetch(
          `/api/search?publicKey=${searchType}=${searchValue}`
        );

        console.log("API response:", response);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API data:", data);

        if (data.transactions) {
          setFilteredTransactions(data.transactions);
        } else {
          setError("No transactions found.");
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container mx-auto px-3 h-full">
    
        <div className="flex justify-center mb-6">
          <div className="lg:w-6/12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-4 py-6">
                
                <div className="text-blueGray-700 text-center font-bold text-2xl mb-6">
                  Search Transactions
                </div>

              
                <div className="flex justify-between items-center mb-4">
                
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-4 py-2 rounded-lg border-2 border-blueGray-300 focus:outline-none focus:ring-2 focus:ring-blueGray-500"
                  >
                    <option value="name">Name</option>
                    <option value="id">ID</option>
                  </select>

                  
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={`Search by ${searchType}`}
                    className="flex-grow px-4 py-2 border-2 border-blueGray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueGray-500"
                  />

                  
                  <button
                    onClick={handleSearch}
                    className="bg-blueGray-700 text-white px-6 py-2 rounded-lg hover:bg-blueGray-600 transition-all"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div className="flex flex-wrap justify-center gap-6 h-full">
          {loading && <div className="text-center w-full">Loading...</div>}
          {error && (
            <div className="text-center w-full text-red-500">{error}</div>
          )}
          {!loading && filteredTransactions.length === 0 && searchValue && (
            <div className="text-center w-full">
              No transactions found for your search.
            </div>
          )}
          {!loading &&
            filteredTransactions.map((txn, index) => {
              const txnString = JSON.stringify(txn);

              const nameMatch = txnString.match(/"name":"(.*?)"/);
              const uniqueidMatch = txnString.match(/"uniqueId":"(.*?)"/);
              const originMatch = txnString.match(/"origin":"(.*?)"/);
              const descriptionMatch = txnString.match(/"description":"(.*?)"/);
              const conditionMatch = txnString.match(/"condition":"(.*?)"/);
              const curatorIdMatch = txnString.match(/"curatorId":"(.*?)"/);
              const museumIdMatch = txnString.match(/"museumId":"(.*?)"/);

              const name = nameMatch ? nameMatch[1] : "Unknown Name";
              const uniqueid = uniqueidMatch ? uniqueidMatch[1] : "Unknown Id";
              const origin = originMatch ? originMatch[1] : "Unknown Origin";
              const description = descriptionMatch
                ? descriptionMatch[1]
                : "No description available";
              const condition = conditionMatch ? conditionMatch[1] : "Unknown Condition";
              const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";
              const museumId = museumIdMatch ? museumIdMatch[1] : "Unknown Museum";

              return (
                <div
                  key={index}
                  className="relative flex flex-col min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                >
                  <div className="px-4 py-4">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Unique ID:</strong> {uniqueid}</p>
                    <p><strong>Origin Place:</strong> {origin}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Condition:</strong> {condition}</p>
                    <p><strong>Curator:</strong> {curatorId}</p>
                    <p><strong>Museum:</strong> {museumId}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  Transactions.layout = TransactionLayout;

