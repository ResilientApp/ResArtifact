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
          const yearMatch = txnString.match(/"originYear":"(.*?)"/);
          const descriptionMatch = txnString.match(/"description":"(.*?)"/);
          const conditionMatch = txnString.match(/"condition":"(.*?)"/);
          const curatorMatch = txnString.match(/"curator":"(.*?)"/);
          const curatorIdMatch = txnString.match(/"curatorId":"(.*?)"/);
          const museumIdMatch = txnString.match(/"museumId":"(.*?)"/);
          const imageMatch = txnString.match(/"imageUrl":"(.*?)"/);
          const dateMatch = txnString.match(/"date":"(.*?)"/);

          const name = nameMatch ? nameMatch[1] : "Unknown Name";
          const uniqueid = uniqueidMatch ? uniqueidMatch[1] : "Unknown Id";
          const origin = originMatch ? originMatch[1] : "Unknown Origin";
          const year = yearMatch ? yearMatch[1] : "Unknown Year";
          const description = descriptionMatch ? descriptionMatch[1] : "No description available";
          const condition = conditionMatch ? conditionMatch[1] : "Unknown Condition";
          const curator = curatorMatch ? curatorMatch[1] : "Unknown Curator";
          const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";
          const museumId = museumIdMatch ? museumIdMatch[1] : "Unknown Museum";
          const url = imageMatch ? imageMatch[1] : "Unknown Museum";
          const date = dateMatch ? dateMatch[1] : "Unknown Date";


	const getRandomLightColor = () => {
  
  const lightColors = [
    '#87CEFA' 
    
     
  ];
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
};
          return (
            <div key={index} 
            className="relative flex flex-col py-6 px-2 items-center min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 transition-transform transform hover:scale-105 hover:shadow-2xl hover:rotate-2 border border-solid border-lightBlue-200 border-5" style={{ backgroundColor: getRandomLightColor() }}>
              
            <div className="text-center mb-2 ">
              <h2 className="text-2xl font-bold text-black mt-2">{name}</h2>
              <img
                className="max-h-300-px max-w-300-px rounded-lg shadow-lg mt-6 mb-2"
                src={url || '/default-image.jpg'}
                alt="Artifact Image"
              />
            </div>
           
            
             <div className="px-2 py-2 flex flex-col items-center text-center">
  <p className="text-black break-words">
    <strong className="font-bold">Unique ID :</strong> {uniqueid}
  </p>
  <p className="text-black break-words">
    <strong className="font-bold">Origin Place :</strong> {origin}
  </p>
  <p className="text-black break-words">
    <strong className="font-bold">Origin Year :</strong> {year}
  </p>
  <p className="text-black break-words">
    <strong className="font-bold">Description :</strong> {description}
  </p>
  <p className="text-black break-words">
    <strong className="font-bold">Condition :</strong> {condition}
  </p>
  <p className="text-black break-words">
    <strong className="font-bold">Acquired On :</strong> {date}
  </p>
</div>

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

