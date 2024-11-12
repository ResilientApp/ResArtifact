import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "components/Navbars/IndexNavbar.js";
import TransactionForm from 'components/ResilientDB/TransactionForm.js'

import TransactionLayout from "layouts/Transaction.js";

export default function Transaction() {
    return (
        <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <TransactionForm />
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
    </>
  );
}

Transaction.layout = TransactionLayout;