import React, { useState, useEffect, useRef } from "react";
import { ResilientDB, FetchClient } from 'resilientdb-javascript-sdk';
import TransactionLayout from "layouts/Transaction.js";
import NotificationModal from 'components/ResilientDB/NotificationModal';

const fetchClient = new FetchClient();
const resilientDBClient = new ResilientDB("http://localhost:8000/", fetchClient);
const { publicKey, privateKey } = ResilientDB.generateKeys();


async function createTransaction(name, description, image, year) {
    const transactionData = {
        operation: "CREATE",
        amount: 1,
        signerPublicKey: publicKey,
        signerPrivateKey: privateKey,
        recipientPublicKey: publicKey,
        type: "ARTIFACT",
        asset: { 
            name: name,
            description: description,
            image: image,
            year: year,
         }
      };
    
    console.log("Transaction Data:", transactionData, "of type", typeof transactionData)
    const transaction = await resilientDBClient.postTransaction(transactionData);
    console.log('Transaction posted:', transaction);
    return transaction.id;
}

export default function NewArtifact() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [year, setYear] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !image || !year) {
            setModalTitle('Validation Error');
            setModalMessage('All fields are required.');
            setShowModal(true);
            return;
        }
        const yearValue = parseInt(year, 10);

        if (isNaN(yearValue)) {
            setModalTitle('Validation Error');
            setModalMessage('Year must be a valid number.');
            setShowModal(true);
            return;
        }

        createTransaction(name, description, image, yearValue)

    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-700 text-center mb-3 mt-10 font-bold text-2xl">
                  <p>Add a New Artifact</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3 mt-6">
                  <input
                    type="text"
                    placeholder="Enter Artifact Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  </div>
                  <div className="form-group mb-3 mt-6">
                  <input
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  </div>
                  <div className="form-group mb-3 mt-6">
                  <input
                    type="text"
                    placeholder="Enter Image Link"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  </div>
                  <div className="form-group mb-3 mt-6">
                  <input
                    type="text"
                    placeholder="Enter Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  </div>
                  <div className="form-group text-center">
                  <button type="submit"
                  className="option-button bg-blueGray-700 mt-3 hover:bg-blueGray-400 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 "
                  >Create</button>
                  </div>
                </form>
                </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                        <a
                        href="/auth/login"
                        className="text-blueGray-200 option-button"
                        >
                        <small>Back to Dashboard</small>
                        </a>
                    </div>
                </div>
            </div>
            </div>
        </div>
            <NotificationModal
            show={showModal}
            title={modalTitle}
            message={modalMessage}
            onClose={handleCloseModal}
        />
        </>
    )
}

NewArtifact.layout = TransactionLayout;