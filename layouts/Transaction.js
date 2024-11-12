import React from "react";

// components

import DarkNavbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

export default function TransactionLayout({ children }) {
  return (
    <>
      <DarkNavbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
        <div className="absolute top-0 w-full h-full bg-gradient-blue-gray bg-no-repeat bg-full"></div>

          {children}
          <div className="h-10"></div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
