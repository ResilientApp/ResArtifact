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
        setTransaction(data.transactions); // Assuming the response structure has a 'transactions' field
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

  return (
    <>
      <Navbar /> {/* Add the Navbar */}
      <section className="relative pt-20 px-6 min-h-screen pb-20 bg-gray-50">
        <a href="/artifact/home" className="text-blueGray-800 hover:text-blueGray-500 px-6">
          Back to Collection
        </a>
        <div className="flex justify-center flex-wrap px-12 py-6">
          {/* Artifact details section */}
          <div className="flex flex-col items-center max-w-md mr-10 bg-white p-6 shadow-lg rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-700">{transaction.name}</h2>
              <img
                className="w-full h-auto rounded-lg shadow-lg mt-4"
                src={transaction.image}
                alt="Artifact Image"
              />
            </div>
            <table className="w-full bg-transparent border-collapse">
              <tbody>
                <tr>
                  <td className="px-6 bg-blueGray-100 text-blueGray-500 align-middle py-3 text-xs font-semibold text-left">Description</td>
                  <td className="px-6 py-3 bg-blueGray-50 border border-solid border-blueGray-200">{transaction.description}</td>
                </tr>
                <tr>
                  <td className="px-6 bg-blueGray-100 text-blueGray-500 align-middle py-3 text-xs font-semibold text-left">Year</td>
                  <td className="px-6 py-3 bg-blueGray-50 border border-solid border-blueGray-200">{transaction.year}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Transactions list */}
          <div className="flex flex-col bg-blueGray-400 px-4 py-4 shadow ml-10 rounded-lg">
            <h2 className="text-white font-bold uppercase mb-6">Transactions</h2>
            <CardTransaction />
            <CardTransaction />
            <CardTransaction />
          </div>
        </div>

        {/* Raw JSON Data section */}
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Raw Transaction Data</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-lg text-xs overflow-x-auto">
            {JSON.stringify(transaction, null, 2)}
          </pre>
        </div>
      </section>
      <Footer /> {/* Add the Footer */}
    </>
  );
}

