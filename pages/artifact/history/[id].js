import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ArtifactHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Extract the 'id' parameter from the URL

  // Fetch transactions for a given artifact
  useEffect(() => {
    if (!id) return; // Do nothing if ID is not available yet

    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/getUid?id=${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data.transactions); // Store the fetched transactions
      } catch (error) {
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  // Display loading, error, or transaction details
  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (transactions.length === 0) return <p>No transactions found for this artifact.</p>;

  // Reverse the transactions to show the most recent first
  const reversedTransactions = [...transactions].reverse();

  // Function to extract details from the transaction
  const extractTransactionDetails = (txn) => {
    const txnString = JSON.stringify(txn);
    
    const nameMatch = txnString.match(/"name":"(.*?)"/);
    const idMatch = txnString.match(/"uniqueId":"(.*?)"/);
    const originMatch = txnString.match(/"origin":"(.*?)"/);
    const originYearMatch = txnString.match(/"originYear":"(.*?)"/);
    const descriptionMatch = txnString.match(/"description":"(.*?)"/);
    const curatorMatch = txnString.match(/"curator":"(.*?)"/);
    const curatorIdMatch = txnString.match(/"curatorId":"(.*?)"/);
    const ownerMatch = txnString.match(/"owner":"(.*?)"/);
    const dateMatch = txnString.match(/"date":"(.*?)"/);
    const keyMatch = txnString.match(/"public_key":"(.*?)"/);
    
    
    const name = nameMatch ? nameMatch[1] : "Unknown Name";
    const uid = idMatch ? idMatch[1] : "Unknown UID";
    const origin = originMatch ? originMatch[1] : "Unknown Origin";
    const originYear = originYearMatch ? originYearMatch[1] : "Unknown Year";
    const description = descriptionMatch ? descriptionMatch[1] : "No description available";
    const curator = curatorMatch ? curatorMatch[1] : "Unknown Curator";
    const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";
    const owner = ownerMatch ? ownerMatch[1] : "Unknown Owner";
    const date = dateMatch ? dateMatch[1] : "Unknown Date";
    const key = keyMatch ? keyMatch[1] : "Unknown Date";    

    return { name, uid, origin, originYear, description, curatorId, curator,owner,date };
  };

  return (
    <>
      <section className="relative pt-10 px-6 pb-20 bg-gray-50">
        <div className="flex justify-center items-start px-6">
          <div className="w-full max-w-4xl mx-auto"> {/* Added mx-auto for centering */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-700">History of the Artifact</h2>
            </div>

            <div className="space-y-4">
              {/* Display Current Owner */}
              {reversedTransactions.length > 0 && (
                <>
                  <div className="font-bold text-xl text-center">Current Owner</div> {/* Title outside the box */}
                  <div className="border p-4 shadow-md rounded-lg bg-white text-center mb-8 max-w-lg mx-auto"> {/* Reduced padding and set max-width */}
                    <p><strong>Owner:</strong> {extractTransactionDetails(reversedTransactions[0]).owner}</p>
                    <p><strong>Item was Acquired on :</strong> {extractTransactionDetails(reversedTransactions[0]).date}</p>
                    
                    <p><strong>Authenticated By :</strong> {extractTransactionDetails(reversedTransactions[0]).curator}</p>
                    <p><strong>Authenticator Id:</strong> {extractTransactionDetails(reversedTransactions[0]).curatorId}</p>
                    
                  </div>
                </>
              )}

              {/* Display Past Owners (only print label once) */}
              {reversedTransactions.length > 1 && (
                <>
                  <div className="font-bold text-xl text-center">Past Owners</div> {/* Title outside the box */}
                  {reversedTransactions.slice(1).map((txn, index) => (
                    <div key={index} className="border p-4 shadow-md rounded-lg bg-white text-center max-w-lg mx-auto"> {/* Reduced padding and set max-width */}
                      <p><strong>Owner:</strong> {extractTransactionDetails(txn).owner}</p>
                      <p><strong>Item was Acquired on:</strong> {extractTransactionDetails(txn).date}</p>
                      <p><strong>Authenticated By:</strong> {extractTransactionDetails(txn).curator}</p>
                      <p><strong>Authenticator Id:</strong> {extractTransactionDetails(txn).curatorId}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

