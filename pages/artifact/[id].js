import React from "react";
import Navbar from 'components/Navbars/CollectionNavbar'
import Footer from 'components/Footers/FooterDark'
import CardTransaction from 'components/Cards/CardTransaction'

// should take id as parameter and fetch to get information, for now use this temporary to display frontend
 
export default function Artifact({ artifactData }) {
    return(
        <>
            <Navbar />
            <section className="relative pt-20 mt-6 px-6 min-h-screen pb-20">
                <a
                    href="/artifact/home"
                    className="text-blueGray-800 hover:text-blueGray-500 px-6">
                    Back to Collection
                </a>
                <div className="flex justify-center flex-wrap px-12 py-6">
                    <div className="flex flex-col items-center max-w-md mr-10">
                        <div className="text-blueGray-700 text-center mb-6 font-bold text-2xl">
                            <p>{ artifactData.name }</p>
                        </div>
                        <img
                            className="max-w-sm max-h-sm mb-6"
                            src={artifactData.image}
                            alt="Artifact Item"></img>
                        <table className="items-center w-full bg-transparent border-collapse">
                            <tr>
                                <td className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Description</td>
                                <td className="px-6 py-3 bg-blueGray-50 border border-solid border-blueGray-200"> { artifactData.description }</td>
                            </tr>
                            <tr>
                                <td className="px-6 bg-blueGray-100 text-blueGray-500 align-middle border border-solid border-blueGray-200 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Year</td>
                                <td className="px-6 py-3 bg-blueGray-50 border border-solid border-blueGray-200"> { artifactData.year }</td>
                            </tr>
                        </table>

                    </div>
                    <div className="flex flex-col bg-blueGray-400 px-4 py-4 shadow ml-10">
                        <div className="text-white font-bold uppercase mb-6">
                            Transactions
                        </div>
                        <CardTransaction />
                        <CardTransaction />
                        <CardTransaction />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

const tempArtifacts = [
    {
        params: {
            id: 'holy-bible',
            name: 'Holy Bible',
            image: 'https://www.senate.gov/art-artifacts/resources/graphics/source/14_00055_001_a.jpg',
            description: "The Holy Bible, containing the Old and New testament. Translated out of the original tongues; and with the former translations diligently compared and revised, to his Majesty's special command. Appointed to be read in churches.",
            year: 1826
        }
    }, 
    {
        params: {
            id: 'impeachment-ticket',
            name: 'Impeachment Trial Ticket',
            image: "https://www.senate.gov/art-artifacts/resources/graphics/source/16_00062_001_a.jpg",
            description: "Ticket, 1868 Impeachment Trial, United States Senate Chamber",
            year: 1868
        }
    }
]

function getArtifactData(id) {
    const paths = tempArtifacts;
    let name = "";
    let image = "";
    let description = "";
    let year = 0;
    paths.map(path => {
        if (path.params.id === id) {
            name = path.params.name;
            image = path.params.image;
            description = path.params.description;
            year = path.params.year;
        }
    })
    return {
        id,
        image,
        name,
        description,
        year
    }
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = tempArtifacts;
    return {
        paths,
        fallback: false,
    };
}

  export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const artifactData = getArtifactData(params.id)
    return {
        props: {
          artifactData,
        },
      };
}