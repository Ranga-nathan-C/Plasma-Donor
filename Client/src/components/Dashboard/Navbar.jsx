import React from "react";
import { HeartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <a
          href="/"
          className="flex items-center text-xl font-bold text-red-600"
        >
          <HeartIcon className="w-8 h-8 mr-2 text-red-500" /> PlasmaCare
        </a>

        <button
          className="text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        <div
          className={`md:flex space-x-6 ${
            isOpen ? "block" : "hidden"
          } w-full md:w-auto mt-4 md:mt-0`}
        >
          <ul className="space-x-6 font-medium text-gray-700 md:flex">
            <li>
              <a href="/" className="transition hover:text-red-500">
                Home
              </a>
            </li>
            <li>
              <a href="#Donate" className="transition hover:text-red-500">
                Donate
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-red-500">
                Donation Center
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-red-500">
                Events
              </a>
            </li>
            <li>
              <a href="/ContactUs" className="transition hover:text-red-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <a
          href="/raiserequest"
          className="hidden px-4 py-2 font-semibold text-white transition bg-red-500 rounded-lg md:inline-block hover:bg-red-600"
        >
          Raise Request
        </a>
      </div>
    </nav>
  );
}
