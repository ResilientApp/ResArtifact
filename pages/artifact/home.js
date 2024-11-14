import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
 
export default function ArtifactHomepage({allArtifactsData}) {
    console.log(allArtifactsData)
    allArtifactsData.map((artifact) => (
        console.log(artifact)
    ))
    return(
        <>
            <div>
                {allArtifactsData.map((artifact) => (
                    
                    <div key={artifact.params.id}>
                        {artifact.params.name}
                    </div>
                ))}
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

export async function getStaticProps() {
    // Return a list of possible value for id
    const allArtifactsData = tempArtifacts;
    return {
        props: {
            allArtifactsData,
        }
    }
}