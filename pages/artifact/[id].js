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

  
    useEffect(() => {
      if (!id) return; 

      const fetchTransaction = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`/api/getId?id=${id}`);

          if (!response.ok) {
            throw new Error('Failed to fetch transaction');
          }

          const data = await response.json();
          setTransaction(data.transactions); 
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


    const txnString = JSON.stringify(transaction);
    const nameMatch = txnString.match(/"name":"(.*?)"/);
    const idMatch = txnString.match(/"uniqueId":"(.*?)"/);
    const originMatch = txnString.match(/"origin":"(.*?)"/);
    const originYearMatch = txnString.match(/"originYear":"(.*?)"/);
    const descriptionMatch = txnString.match(/"description":"(.*?)"/);
    const curatorIdMatch = txnString.match(/"curatorId":"(.*?)"/);
    const urlMatch = txnString.match(/"imageUrl":"(.*?)"/);

    const name = nameMatch ? nameMatch[1] : "Unknown Name";
    const uid = idMatch ? idMatch[1] : "Unknown UID";
    const url = urlMatch ? urlMatch[1] : null; 
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
            
            <div className="flex flex-col items-center max-w-md bg-white p-6 shadow-lg rounded-lg" style={{backgroundColor: '#D2B48C', border: '4px solid #000', }}>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-black mt-6">{name}</h2>
                <img
                  className="max-h-300-px max-w-300-px rounded-lg shadow-lg mt-10 mb-4 flex justify-center"
                  src={url || '/default-image.jpg'} 
                  alt="Artifact Image"
                  
                />
              </div>

        
              
              <div className="mt-4 mb-12 px-6 " >
                <table style={{ border: '4px solid #654321' }}>
                  <tr >
                    <th className="px-6 bg-blueGray-100 text-black align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                      Name:
                    </th>
                    <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                      {name}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 bg-blueGray-100 text-black align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                      Description:
                    </th>
                    <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                      {description}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 bg-blueGray-100 text-black align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                      Origin:
                    </th>
                    <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                      {origin}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 bg-blueGray-100 text-black align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                      Year:
                    </th>
                    <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                      {originYear}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 bg-blueGray-100 text-black align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
                      UID:
                    </th>
                    <td className="border border-solid border-blueGray-200 px-6 align-middle border-l-0 text-sm p-4 bg-blueGray-50 text-left">
                      {uid}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 bg-blueGray-100 text-black align-middle border border-solid border-blueGray-300 py-3 text-xs uppercase border-r-0 font-semibold text-left">
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
