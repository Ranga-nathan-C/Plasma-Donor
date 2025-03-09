import React from "react";
import { HeartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { UserCircle, Settings, LogOut } from "lucide-react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const userId = JSON.parse(sessionStorage.getItem("user")).user.id;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/userstatus/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isOnline: false,
        }),
      });

      sessionStorage.removeItem("user");
      window.location.href = "/login";
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  };

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
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
            <UserCircle
              size={32}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
