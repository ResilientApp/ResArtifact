import { useState, useEffect } from 'react';
import CardArtifact from 'components/Cards/CardArtifact';
import SortByDropdown from 'components/Dropdowns/SortByDropdown';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import FooterSmall from "components/Footers/FooterDark.js";

export default function CombinedPage({ allArtifactsData }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [artifactSearch, setArtifactSearch] = useState("");


  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/getAll`);
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

  useEffect(() => {
    fetchTransactions();
  }, []);


  const filteredArtifacts = allArtifactsData.filter(artifact => {
    return artifact.params.name.toLowerCase().includes(artifactSearch.toLowerCase());
  });


  const handleArtifactSearchChange = (event) => {
    setArtifactSearch(event.target.value);
  };

  return (
    <>
      <IndexNavbar fixed />
      <section className="relative pt-20 px-6 min-h-screen pb-20">
        <div className="px-6 pt-6 text-center">
          <div className="font-semibold text-4xl text-blueGray-600">
            <h2>Artifact Collection</h2>
          </div>
          <div className="mt-2 mb-12 text-base text-blueGray-700">
            Browse our collection of artifacts and view associated transactions.
          </div>
        </div>
        <hr className="border-b-1 pb-2 border-blueGray-600" />


        <div className="flex flex-row mt-10 px-12 justify-center">

          <div className="w-1/4 px-4 py-4 mr-10 bg-blueGray-400 flex flex-col items-center shadow rounded">
            <h3 className="text-lg font-bold">Filters</h3>
            <div className="w-full mt-4">
              <p className="text-white text-sm font-bold block rounded uppercase mb-1">Sort By:</p>
              <SortByDropdown />
            </div>

            <div className="mt-4 w-full">
              <form className="flex items-center justify-center">
                <input
                  type="search"
                  className="mr-4 border-1 border-blueGray-400 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-2 ease-linear transition-all duration-150"
                  placeholder="Search Artifact Name"
                  value={artifactSearch}
                  onChange={handleArtifactSearchChange}
                />
                <button type="submit" className="px-2 py-1 bg-blueGray-600 text-white text-xs font-bold block rounded uppercase">
                  Search
                </button>
              </form>
            </div>
          </div>


          <div className="w-full">

            <div className="flex flex-wrap justify-center mt-6 mb-6">
              
              {/* Dynamic Transactions */}
              {loading && <p className="text-center text-blueGray-700">Loading transactions...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!loading && transactions.length === 0 && <p className="text-center text-blueGray-700">No transactions found.</p>}
              {transactions.map((txn, index) => {
                const txnString = JSON.stringify(txn);
                const nameMatch = txnString.match(/"name":"(.*?)"/);
                const originYearMatch = txnString.match(/"originYear":"(.*?)"/);
                const name = nameMatch ? nameMatch[1] : "Unknown Name";
                const originYear = originYearMatch ? originYearMatch[1] : "Unknown Year";
                const idMatch = txnString.match(/"id":"(.*?)"/);
                const id = idMatch ? idMatch[1] : "Unknown ID";

                return (
                  <div key={index} className="px-4 mb-4 w-auto">
                    <a href={`/artifact/${id}`}> {/* Keep the link functional with 'id' */}
                      <CardArtifact 
                        params={{
                          id: id,       // Pass the correct ID here
                          name: name,
                          year: originYear,
                          description: "Transaction details", // Customize description if needed
                          image: txn.image // Assuming transaction might have an image field
                        }} 
                      />
                    </a>
                   
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FooterSmall />
    </>
  );
}

// Static props to provide artifacts data (Remove the static example artifacts)
export async function getStaticProps() {
  return {
    props: {
      allArtifactsData: [],  // Replace with actual data fetching logic
    }
  };
}

