import React, { useState } from "react";
import { HeartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircle, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.user?.id;

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/userstatus/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: false }),
      });

      sessionStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center text-xl font-bold text-red-600"
        >
          <HeartIcon className="mr-2 h-8 w-8 text-red-500" />
          PlasmaCare
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="text-gray-700 md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Main Menu */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } w-full mt-4 md:mt-0 md:flex md:w-auto md:space-x-6`}
        >
          <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 font-medium text-gray-700">
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

        {/* Raise Request Button */}
        <a
          href="/raiserequest"
          className="hidden md:inline-block px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition"
        >
          Raise Request
        </a>

        {/* User Profile Dropdown */}
        <div
          className="relative ml-4"
          onMouseEnter={() => setUserDropdownOpen(true)}
          onMouseLeave={() => setUserDropdownOpen(false)}
        >
          <button
            className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={userDropdownOpen}
          >
            <UserCircle
              size={32}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>

          {/* Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white py-1 z-10">
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
