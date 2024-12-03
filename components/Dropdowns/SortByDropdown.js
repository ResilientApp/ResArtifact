import React from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";

const SortByDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [dropdownText, setDropdownText] = React.useState("Select...");

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="block font-semibold text-blueGray-600 text-sm mb-2 bg-white px-2 py-2 rounded flex justify-between items-center"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {dropdownText}
        <p className={
          (dropdownPopoverShow ? "font-bold" : "rotate-180") +
          " font-bold"
        }>^</p>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-1 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div
            className={
                "text-sm py-1 px-4 block font-semibold text-blueGray-500 w-full whitespace-nowrap bg-transparent cursor-pointer"
              }
            onClick={(e) => {setDropdownText("Recently Added"); closeDropdownPopover()}}>
            Recently Added
        </div>
        <div className="h-0 border border-solid border-blueGray-100" />
        <div
            className={
                "text-sm py-1 px-4 block font-semibold text-blueGray-500 w-full whitespace-nowrap bg-transparent cursor-pointer"
              }
            onClick={(e) => {setDropdownText("Least Recently Added"); closeDropdownPopover()}}>
            Least Recently Added
        </div>
        <div className="h-0 border border-solid border-blueGray-100" />
        <div
            className={
                "text-sm py-1 px-4 block font-semibold text-blueGray-500 w-full whitespace-nowrap bg-transparent cursor-pointer"
              }
            onClick={(e) => {setDropdownText("Most Transactions"); closeDropdownPopover()}}>
            Most Transactions
        </div>
        <div className="h-0 border border-solid border-blueGray-100" />
        <div
            className={
                "text-sm py-1 px-4 block font-semibold text-blueGray-500 w-full whitespace-nowrap bg-transparent cursor-pointer"
              }
            onClick={(e) => {setDropdownText("Least Transactions"); closeDropdownPopover()}}>
            Least Transactions
        </div>
        <div className="h-0 border border-solid border-blueGray-100" />
        <div
            className={
                "text-sm py-1 px-4 block font-semibold text-blueGray-500 w-full whitespace-nowrap bg-transparent cursor-pointer"
              }
            onClick={(e) => {setDropdownText("Newest Origin"); closeDropdownPopover()}}>
            Newest Origin
        </div>
        <div className="h-0 border border-solid border-blueGray-100" />
        <div
            className={
                "text-sm py-1 px-4 block font-semibold text-blueGray-500 w-full whitespace-nowrap bg-transparent cursor-pointer"
              }
            onClick={(e) => {setDropdownText("Oldest Origin"); closeDropdownPopover()}}>
            Oldest Origin
        </div>
      </div>
    </>
  );
};

export default SortByDropdown;
