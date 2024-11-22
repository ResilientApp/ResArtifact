import React, { useState, useEffect } from "react";
import CardArtifact from "components/Cards/CardArtifact";
import SortByDropdown from "components/Dropdowns/SortByDropdown";
import IndexNavbar from "components/Navbars/IndexNavbar";
import FooterSmall from "components/Footers/FooterDark.js";

export default function ArtifactHomepage({ allArtifactsData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions on page load
  useEffect(() => {
    const fetchTransactions = async () => {
      const query = `
        query {
          getFilteredAlllTransactions(filter: { alll: "44" }) {
            id
            amount
            asset
          }
        }
      `;
      try {
        const response = await fetch("http://localhost:8000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const result = await response.json();
        if (result.data) {
          // Transform transaction data to include name and originYear from asset
          const transformedTransactions = result.data.getFilteredAlllTransactions.map(
            (transaction) => ({
              params: {
                id: transaction.id,
                name: extractName(transaction.asset) || "No Name", // Get name from asset
                year: extractOriginYear(transaction.asset) || "Unknown Year", // Get originYear from asset
                description: `Transaction Amount: $${transaction.amount}`,
                image: null, // No image available for transaction
              },
            })
          );
          setTransactions(transformedTransactions);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Helper functions to extract name and origin year using string matching
  const extractName = (asset) => {
    // Convert asset object to string
    const assetString = JSON.stringify(asset);

    // Regex to match 'name': 'value' (single quotes)
    const regex = /\'name\':\s*\'([^\']+)\'/;
    const match = assetString.match(regex);

    // If there's a match, return the value after 'name'
    if (match) {
      return match[1];
    } else {
      return null; // If no match, return null
    }
  };

  const extractOriginYear = (asset) => {
    // Convert asset object to string
    const assetString = JSON.stringify(asset);

    // Regex to match 'originYear': 'value' (single quotes)
    const regex = /\'originYear\':\s*\'([^\']+)\'/;
    const match = assetString.match(regex);

    // If there's a match, return the value after 'originYear'
    if (match) {
      return match[1];
    } else {
      return null; // If no match, return null
    }
  };

  // Merge artifacts and transactions into a single list
  const combinedData = [...allArtifactsData, ...transactions];

  // Filter and sort combined data
  const filteredCombinedData = combinedData.filter((item) =>
    item.params.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCombinedData = filteredCombinedData.sort((a, b) => {
    if (sortOption === "Newest Origin") {
      return (b.params.year || 0) - (a.params.year || 0);
    } else if (sortOption === "Oldest Origin") {
      return (a.params.year || 0) - (b.params.year || 0);
    } else {
      return 0;
    }
  });

  return (
    <>
      <IndexNavbar fixed />
      <section className="relative pt-20 px-6 min-h-screen pb-20">
        <div className="px-6 pt-6">
          <div className="font-semibold text-4xl text-blueGray-600">
            <h2>Artifact Collection</h2>
          </div>
          <div className="mt-2 mb-12 text-base text-blueGray-700">
            View our entire collection of artifacts within our secure database.
            Choose a specific artifact to view its information and all
            transactions made for it.
          </div>
        </div>
        <hr className="border-b-1 pb-2 border-blueGray-600" />
        <div className="flex flex-row mt-10 px-12">
          <div className="w-1/4 px-4 py-4 mr-10 bg-blueGray-400 flex flex-col items-center shadow rounded">
            <h3 className="text-lg font-bold">Filters</h3>
            <div className="w-full mt-4">
              <p className="text-white text-sm font-bold block rounded uppercase mb-1">
                Sort By:
              </p>
              <SortByDropdown
                onSelect={(selectedOption) => setSortOption(selectedOption)}
              />
            </div>
          </div>
          <div className="w-full">
            {/* Search Bar */}
            <form
              className="flex items-center justify-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                id="a-search"
                className="mr-4 border-1 border-blueGray-400 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-2 ease-linear transition-all duration-150"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-2 py-1 bg-blueGray-600 text-white text-xs font-bold block rounded uppercase"
              >
                Search
              </button>
            </form>

            {/* Display Combined Data (Artifacts + Transactions) */}
            <div className="flex flex-row flex-wrap px-4 mt-6 mb-6 ml-4">
              {sortedCombinedData.map((item) => (
                <div key={item.params.id} className="mr-4 ml-4">
                  <a href={"/artifact/" + item.params.id}>
                    <CardArtifact params={item.params} />
                  </a>
                </div>
              ))}
              {filteredCombinedData.length === 0 && (
                <p className="text-center text-blueGray-600 mt-4">
                  No items found.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <FooterSmall />
    </>
  );
}

// Sample Artifacts
const tempArtifacts = [
  {
    params: {
      id: "holy-bible",
      name: "Holy Bible",
      image:
        "https://www.senate.gov/art-artifacts/resources/graphics/source/14_00055_001_a.jpg",
      description:
        "The Holy Bible, containing the Old and New testament. Translated out of the original tongues; and with the former translations diligently compared and revised, to his Majesty's special command. Appointed to be read in churches.",
      year: 1826,
    },
  },
  {
    params: {
      id: "impeachment-ticket",
      name: "Impeachment Trial Ticket",
      image:
        "https://www.senate.gov/art-artifacts/resources/graphics/source/16_00062_001_a.jpg",
      description:
        "Ticket, 1868 Impeachment Trial, United States Senate Chamber",
      year: 1868,
    },
  },
  {
    params: {
      id: "declaration-indepdence",
      name: "Declaration of Independence",
      image:
        "https://teachingamericanhistory.org/content/uploads/2021/09/3694394069_2d41fa536e_b-1.jpg",
      description:
        "Letter, 1776, Proclamation of American independence from British rule",
      year: 1776,
    },
  },
];

export async function getStaticProps() {
  const allArtifactsData = tempArtifacts;
  return {
    props: {
      allArtifactsData,
    },
  };
}

