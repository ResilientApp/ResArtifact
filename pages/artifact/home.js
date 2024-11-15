import React from "react";
import { ResilientDB, FetchClient } from 'resilientdb-javascript-sdk';

const fetchClient = new FetchClient();
const resilientDBClient = new ResilientDB("http://localhost:8000", fetchClient);
console.log("ResilientDB Client:", resilientDBClient)

async function getAllTransactions() {
    const transactions = await resilientDBClient.getFilteredTransactions({ type: "ARTIFACT" });
    console.log('All Transactions:', transactions);
}

async function getTransaction(id) {
    console.log("Id passing in:", id, typeof id)
    const transaction = await resilientDBClient.getTransaction(id.id)
    console.log('Transaction:', transaction)
}
 
getTransaction({id: "65b27771146183c35e0ae56c472fbcd1d5cb05cd59c57531157402f970f387ad"})
getAllTransactions()

export default function ArtifactHomepage() {
    return(
        <>
            <div>
                help
            </div>
        </>
    )
}