import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/FooterDark';

export default function ArtifactHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/getUid?id=${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (transactions.length === 0) return <p>No transactions found for this artifact.</p>;

  const reversedTransactions = [...transactions].reverse();

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

    return {
      name: nameMatch ? nameMatch[1] : "Unknown Name",
      uid: idMatch ? idMatch[1] : "Unknown UID",
      origin: originMatch ? originMatch[1] : "Unknown Origin",
      originYear: originYearMatch ? originYearMatch[1] : "Unknown Year",
      description: descriptionMatch ? descriptionMatch[1] : "No description available",
      curator: curatorMatch ? curatorMatch[1] : "Unknown Curator",
      curatorId: curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator ID",
      owner: ownerMatch ? ownerMatch[1] : "Unknown Owner",
      date: dateMatch ? dateMatch[1] : "Unknown Date",
    };
  };

  // Helper function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Get the name of the artifact from the first transaction
  const artifactName = transactions.length > 0 ? extractTransactionDetails(transactions[0]).name : "Artifact";

  return (
    <>
      <Navbar />
      <section className="relative pt-20 px-6 min-h-screen pb-20 bg-gray-50">
        <a href="/artifact/home" className="text-blueGray-800 hover:text-blueGray-500 px-6 mb-6">
          Back to Collection
        </a>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">History of {artifactName}</h2>
        </div>

        <div className="timeline mx-auto max-w-4xl" style={{ marginLeft: '37%' }}>
          {[...transactions].reverse().map((txn, index) => {
            const details = extractTransactionDetails(txn);
            const randomColor = getRandomColor(); // Get a random color for the background
            return (
              <div
                key={index}
                className="timeline-item"
                style={{ animationDelay: `${index * 2}s` }}
              >
                <div 
                  className="timeline-content"
                  style={{ backgroundColor: randomColor }} // Apply random background color
                >
                  <h3 className="font-bold text-lg">
                    {index === 0 ? "Current Owner" : `Past Owner #${index}`}
                  </h3>
                  <p><strong>Owner:</strong> {details.owner}</p>
                  <p><strong>Acquired On:</strong> {details.date}</p>
                  <p><strong>Authenticated By:</strong> {details.curator}</p>
                  <p><strong>Authenticator ID:</strong> {details.curatorId}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      <style jsx>{`
  .timeline {
    position: relative;
    margin: 20px auto;
    padding: 10px 0;
    width: 90%;
    display: flex;
    flex-direction: column;
  }

  .timeline-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
    position: relative;
    padding-left: 50px;
    opacity: 0;
    animation: fadeInUp 3s forwards;
  }

  .timeline-item:before {
    content: "";
    position: absolute;
    top: 0;
    left: 20px;
    width: 10px;
    height: 10px;
    background: #007bff;
    border-radius: 50%;
  }

  .timeline-item:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 24px;
    width: 2px;
    height: calc(100% - 10px);
    background: #007bff;
  }

  .timeline-item:last-child:after {
    display: none;
  }

  .timeline-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-height: 200px; 
    min-width: 400px; /* Minimum height */
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
    </>
  );
}

