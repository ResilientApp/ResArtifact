import { useState, useEffect } from 'react';
import TransactionLayout from "layouts/Transaction.js";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicKey = '8gBssy4LhfoJTgDkRRrEU46njEyWYCTv7YSsoF5uTz4n';

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
      <div className="flex flex-wrap justify-center gap-6 h-full">
        
        {loading && (
          <div className="text-center w-full">Loading transactions...</div>
        )}

        {error && (
          <div className="text-center w-full text-red-500">{error}</div>
        )}

     
        {!loading && transactions.length === 0 && (
          <div className="text-center w-full">No transactions found.</div>
        )}

       
        {!loading && transactions.length > 0 && transactions.map((txn, index) => {
          const txnString = JSON.stringify(txn);

          const nameMatch = txnString.match(/"name":"(.*?)"/);
          const uniqueidMatch = txnString.match(/"uniqueId":"(.*?)"/);
          const originMatch = txnString.match(/"origin":"(.*?)"/);
          const descriptionMatch = txnString.match(/"description":"(.*?)"/);
          const conditionMatch = txnString.match(/"condition":"(.*?)"/);
          const curatorMatch = txnString.match(/"curator":"(.*?)"/);
          const curatorIdMatch = txnString.match(/"curatorId":"(.*?)"/);
          const museumIdMatch = txnString.match(/"museumId":"(.*?)"/);
          const imageMatch = txnString.match(/"imageUrl":"(.*?)"/);

          const name = nameMatch ? nameMatch[1] : "Unknown Name";
          const uniqueid = uniqueidMatch ? uniqueidMatch[1] : "Unknown Id";
          const origin = originMatch ? originMatch[1] : "Unknown Origin";
          const description = descriptionMatch ? descriptionMatch[1] : "No description available";
          const condition = conditionMatch ? conditionMatch[1] : "Unknown Condition";
          const curator = curatorMatch ? curatorMatch[1] : "Unknown Curator";
          const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";
          const museumId = museumIdMatch ? museumIdMatch[1] : "Unknown Museum";
          const url = imageMatch ? imageMatch[1] : "Unknown Museum";

          return (
            <div key={index} className="relative flex flex-col items-center min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 transition-transform transform hover:scale-105 hover:shadow-2xl hover:rotate-2">
              
               
            <div className="flex flex-col items-center max-w-md mx-4 bg-white p-6 shadow-lg rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blueGray-600 mt-6">{name}</h2>
              <img
                className="w-full h-auto rounded-lg shadow-lg mt-10 mb-4"
                src={url || '/default-image.jpg'} // Use fallback image if URL is not available
                alt="Artifact Image"
              />
            </div>
            {/* Transaction details below the image */}
            
            <div className="mt-4 mb-12 px-6 ">
              <table>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    Name:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {name}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    Description:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {description}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    Origin:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {origin}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    Condition:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {condition}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    UID:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {uniqueid}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    Curator:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {curatorId}
                  </td>
                </tr>
                </table>
            </div>
          </div>
                {/* Action Button */}
                <button
                onClick={() => handleTransfer(txn)}
                className="mt-4 bg-blueGray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blueGray-500 transition ease-inl"
              >
                Transfer
              </button>

              </div>
          );
        })}
      </div>
    </div>
  );
}

Transactions.layout = TransactionLayout;

