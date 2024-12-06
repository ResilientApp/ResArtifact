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

  
  const filteredTransactions = transactions.filter(txn => {
    const txnString = JSON.stringify(txn);
    const nameMatch = txnString.match(/"name":"(.*?)"/);
    const name = nameMatch ? nameMatch[1] : "";
    return name.toLowerCase().includes(artifactSearch.toLowerCase());
  });

  const handleArtifactSearchChange = (event) => {
    setArtifactSearch(event.target.value);
  };

  return (
    <>
      <IndexNavbar fixed />
      <section className="relative pt-20 px-6 min-h-screen pb-20" style={{backgroundColor: '#FCE9D4'}}>
        <div className="pb-32 pt-20 text-left bg-full pl-10" style={{
            background: "linear-gradient(to bottom, white, transparent), url('/img/ancient-ruins.jpg')",
            backgroundSize: 'cover',
          }}>
          <div className="font-bold text-4xl text-blueGray-700">
            <h2>Artifact Collection</h2>
          </div>
          <div className="mt-2 text-base text-blueGray-700">
            Browse our collection of artifacts and view associated transactions.
          </div>
        </div>
        <hr className="border-b-1 pb-2 border-blueGray-600" />

        <div className="flex flex-row mt-8 px-8 justify-center" >
          <div className="w-1/4 px-4 py-4 mr-10 bg-blueGray-400 flex flex-col items-center shadow rounded" style={{backgroundColor: '#FFB800', border: '2px solid #000'}}>
            <h3 className="text-md font-bold uppercase text-black">Search by Name</h3>

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

            <p className="text-xs font-semibold uppercase text-black mt-4 mb-4">or</p>
            <h3 className="text-md font-bold uppercase text-black">Search by Filters</h3>

            <div className="w-full mt-4">
              <p className="text-black text-sm font-semibold block rounded uppercase mb-1">Sort By:</p>
              <SortByDropdown />
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <p className="text-sm font-bold uppercase text-black">Min. Year</p>
              <input 
                className=" ml-4 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-2 ease-linear transition-all duration-150 border-1 border-blueGray-400"
                placeholder="ex. 1600"></input>
            </div>
            <div className="w-full mt-4 flex justify-between items-center">
              <p className="text-sm font-bold uppercase text-black">Max. Year</p>
              <input 
                className="ml-6 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-2 ease-linear transition-all duration-150 border-1 border-blueGray-400"
                placeholder="ex. 2005"></input>
            </div>
            <button type="submit" className="mt-6 mb-4 px-2 py-1 bg-blueGray-600 text-white text-xs font-bold block rounded uppercase">
                  Filter
            </button>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap justify-start">
             
              {loading && <p className="text-center text-blueGray-700">Loading transactions...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!loading && filteredTransactions.length === 0 && <p className="text-center text-blueGray-700">No transactions found.</p>}
              {filteredTransactions.map((txn, index) => {
                const txnString = JSON.stringify(txn);
                const nameMatch = txnString.match(/"name":"(.*?)"/);
                const urlMatch = txnString.match(/"imageUrl":"(.*?)"/);
                const originYearMatch = txnString.match(/"originYear":"(.*?)"/);
                const name = nameMatch ? nameMatch[1] : "Unknown Name";
                const url = urlMatch ? urlMatch[1] : "Unknown Name";
                const originYear = originYearMatch ? originYearMatch[1] : "Unknown Year";
                const idMatch = txnString.match(/"id":"(.*?)"/);
                const id = idMatch ? idMatch[1] : "Unknown ID";

                return (
                  <div key={index} className="px-4 mb-4 w-auto">
                    <a href={`/artifact/${id}`}>
                      <CardArtifact 
                        params={{
                          id: id,     
                          name: name,
                          year: originYear,
                          
                          image: url 
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
      allArtifactsData: [],  
    }
  };
}

