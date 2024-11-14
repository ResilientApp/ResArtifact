import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
 
export default function Artifact({ artifactData }) {
    console.log(artifactData)
    return(
        <>
            <div>
                <div className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                    <p>{ artifactData.name }</p>
                </div>
                <img
                    className="w-16"
                    src={artifactData.image}
                    alt="Artifact Item"></img>
                <p> { artifactData.description }</p>
                <p> Year: {artifactData.year} </p>
            </div>
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
            image: "",
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