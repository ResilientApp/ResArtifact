import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/FooterDark';
import CardTransaction from 'components/Cards/CardTransaction';

export default function ArtifactPage() {
  const [transaction, setTransaction] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  // First useEffect: Fetch transaction details based on ID
  useEffect(() => {
    if (!id) return; // Do nothing if id is not available yet (initial render)

    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/getId?id=${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch transaction');
        }

        const data = await response.json();
        setTransaction(data.transactions); // Set the transaction data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;
  if (!transaction) return <p className="text-center text-xl">No transaction found.</p>;

  // Extracting other values from the transaction for display
  const txnString = JSON.stringify(transaction);
  const nameMatch = txnString.match(/"name":"(.*?)"/);
  const idMatch = txnString.match(/"uniqueId":"(.*?)"/);
  const originMatch = txnString.match(/"origin":"(.*?)"/);
  const originYearMatch = txnString.match(/"year":"(.*?)"/);
  const descriptionMatch = txnString.match(/"description":"(.*?)"/);
  const curatorIdMatch = txnString.match(/"curatorId":"(.*?)"/);
  const urlMatch = txnString.match(/"imageUrl":"(.*?)"/);

  const name = nameMatch ? nameMatch[1] : "Unknown Name";
  const uid = idMatch ? idMatch[1] : "Unknown UID";
  const url = urlMatch ? urlMatch[1] : null; // If no URL, set to null
  const origin = originMatch ? originMatch[1] : "Unknown Origin";
  const originYear = originYearMatch ? originYearMatch[1] : "Unknown Year";
  const description = descriptionMatch ? descriptionMatch[1] : "No description available";
  const curatorId = curatorIdMatch ? curatorIdMatch[1] : "Unknown Curator";

  return (
    <>
      <Navbar />
      <section className="relative pt-20 px-6 min-h-screen pb-20 bg-gray-50">
        <a href="/artifact/home" className="text-blueGray-800 hover:text-blueGray-500 px-6">
          Back to Collection
        </a>
        <div className="flex justify-center flex-wrap px-12 py-6">
          {/* Artifact details section */}
          <div className="flex flex-col items-center max-w-md mr-10 bg-white p-6 shadow-lg rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-700">{name}</h2>
              <img
                className="w-full h-auto rounded-lg shadow-lg mt-4"
                src={url || '/default-image.jpg'} // Use fallback image if URL is not available
                alt="Artifact Image"
              />
            </div>

            {/* Transaction details below the image */}
            <div className="mt-4 space-y-4 text-center">
              <div>
                <strong>Name:</strong> {name}
              </div>
              <div>
                <strong>UID:</strong> {uid} {/* Display UID */}
              </div>
              <div>
                <strong>Origin:</strong> {origin}
              </div>
              <div>
                <strong>Year:</strong> {originYear}
              </div>
              <div>
                <strong>Description:</strong> {description}
              </div>
              <div>
                <strong>Curator:</strong> {curatorId}
              </div>
            </div>
          </div>
        </div>

        {/* Show History Button */}
        <div className="flex justify-center mt-10">
          <a
            href={`/artifact/history/${id}`}
            className="bg-blue-600 text-black font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Show History
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}

