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

          const name = nameMatch ? nameMatch[1] : "Unknown Name";
          const uniqueid = uniqueidMatch ? uniqueidMatch[1] : "Unknown Id";
          const origin = originMatch ? originMatch[1] : "Unknown Origin";
          const description = descriptionMatch ? descriptionMatch[1] : "No description available";
          const condition = conditionMatch ? conditionMatch[1] : "Unknown Condition";
          const curator = curatorMatch ? curatorMatch[1] : "Unknown Curator";
          const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";
          const museumId = museumIdMatch ? museumIdMatch[1] : "Unknown Museum";

          return (
            <div key={index} className="relative flex flex-col items-center min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 transition-transform transform hover:scale-105 hover:shadow-2xl hover:rotate-2">
              
            
              <div className="px-4 py-4 bg-white shadow-sm rounded-lg flex flex-col items-center space-y-4">
          
                <div className="w-full h-72 bg-gray-300 rounded-lg mb-4 overflow-hidden flex justify-center items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Mona_Lisa_bw_square.jpeg" 
                    alt="Artifact Image"
                    style={{
                      width: '300px', 
                      height: '300px', 
                      objectFit: 'cover', 
                      objectPosition: 'bottom' 
                    }}
                  />
                </div>

                {/* Text Details */}
                <p className="text-center"><strong>Name:</strong> {name}</p>
                <p className="text-center"><strong>Unique ID:</strong> {uniqueid}</p>
                <p className="text-center"><strong>Origin Place:</strong> {origin}</p>
                <p className="text-center"><strong>Description of Item:</strong> {description}</p>
                <p className="text-center"><strong>Condition:</strong> {condition}</p>
                <p className="text-center"><strong>Authenticated By:</strong> {curator}</p>
                

                {/* Action Button */}
                <button
  onClick={() => handleTransfer(txn)}
  className="bg-green-500 text-BLUE border border-green-700 px-4 py-2 rounded hover:bg-green-600 hover:border-green-800 transition-all"
>
  Transfer
</button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Transactions.layout = TransactionLayout;

