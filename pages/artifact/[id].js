import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Navbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/FooterGray';
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
      <section className="relative pt-20 min-h-screen pb-20 bg-gray-200 "
      style={{
        background: "url('/img/ancient-city.jpg')",
        backgroundSize: 'cover',
      }}>
        <a href="/artifact/home" className="text-blueGray-800 hover:text-blueGray-500 font-semibold px-6 hover:ml-4 transition-all ease-in  ">
          Back to Collection
        </a>
        <div className="flex justify-center flex-wrap px-12 py-6 mt-8x">
          {/* Artifact details section */}
          <div className="flex flex-col items-center max-w-md bg-white p-6 shadow-lg rounded-lg">
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
                    Year:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {originYear}
                  </td>
                </tr>
                <tr>
                  <th className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                    UID:
                  </th>
                  <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                    {uid}
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
        </div>

        {/* Show History Button */}
        <div className="flex justify-center mt-10 relative inline-block object-contain overflow-hidden h-10 w-full hover:button-swap-away transition ease-in-out">
          <a
            href={`/artifact/history/${id}`}
            className="start-on absolute bg-white shadow text-blueGray-600 font-bold py-2 px-6 rounded-lg"
          >
            Show Transaction History
          </a>
          <a
            href={`/artifact/history/${id}`}
            className="start-off absolute start-offscreen bg-blueGray-600 shadow text-white font-bold py-2 px-6 rounded-lg"
          >
            Show Transaction History
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
