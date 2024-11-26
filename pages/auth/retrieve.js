import { useState, useEffect } from 'react';
import TransactionLayout from "layouts/Transaction.js";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicKey = '8QkgpLEShfkMEruc5SubiRPN3JagYWLvFAUG9Jy3bay4';

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/retrieve?publicKey=${publicKey}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);


  const handleTransfer = (transaction) => {
   
    const txnString = JSON.stringify(transaction);
    const idMatch = txnString.match(/"id":"(.*?)"/);
    const id = idMatch ? idMatch[1] : null;

    if (id) {
      // Redirect to the new page in the same tab
      window.location.href = `/auth/${id}`;
    } else {
      console.error("Transaction ID not found");
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="text-blueGray-700 text-center mb-5 mt-5 font-bold text-2xl">
              <p>My Artifacts</p>
            </div>

            {loading && (
              <p className="text-center text-blueGray-700">Loading transactions...</p>
            )}
            {error && (
              <p className="text-center text-red-500">{error}</p>
            )}
            {!loading && transactions.length === 0 && (
              <p className="text-center text-blueGray-700">No transactions found.</p>
            )}

            <ul className="space-y-4">
              {transactions.map((txn, index) => {
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
                const description = descriptionMatch ? descriptionMatch[1] : "No description available";
                const condition = conditionMatch ? conditionMatch[1] : "Unknown Condition";
                const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";
                const museumId = museumIdMatch ? museumIdMatch[1] : "Unknown Museum";

                return (
                  <li
                    key={index}
                    className="px-4 py-4 bg-white shadow-sm rounded-lg flex flex-col space-y-2"
                  >
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Unique ID:</strong> {uniqueid}</p>
                    <p><strong>Origin Place:</strong> {origin}</p>
                    <p><strong>Description of Item:</strong> {description}</p>
                    <p><strong>Condition:</strong> {condition}</p>
                    <p><strong>Curator of the Piece:</strong> {curatorId}</p>
                    <p><strong>Held by Museum:</strong> {museumId}</p>
                    <div className="flex space-x-4 mt-2 justify-center">
                      <a
                        href="#view-link" // Add the appropriate link here
                        className="bg-blue text-black px-4 py-2 rounded hover:bg-blue-700 transition-all"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleTransfer(txn)} 
                        className="bg-green text-black px-4 py-2 rounded hover:bg-green-700 transition-all"
                      >
                        Transfer
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Transactions.layout = TransactionLayout;

