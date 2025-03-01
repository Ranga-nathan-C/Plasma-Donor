import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import {
  FaTrophy,
  FaHeartbeat,
  FaCalendarAlt,
  FaHandHoldingHeart,
} from "react-icons/fa";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;
  console.log(user_id)
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/users/details/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));

    // fetch("/api/user/donations")
    //   .then((res) => res.json())
    //   .then((data) => setDonationHistory(data))
    //   .catch((err) => console.error(err));

    // fetch("/api/events/upcoming")
    //   .then((res) => res.json())
    //   .then((data) => setEvents(data))
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        {/* User Profile Section */}
        <motion.div
          className="bg-gray-100 p-8 rounded-3xl shadow-lg max-w-3xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-center mb-3 text-red-600">
            Welcome, {userData?.name || "User"} ❤️
          </h1>
          <p className="text-gray-600 text-center text-lg">{userData?.email}</p>
          <p className="text-gray-700 text-center text-lg">
            Blood Type:{" "}
            <span className="text-red-500 font-bold">
              {userData?.blood_type || "N/A"}
            </span>
          </p>
        </motion.div>

        {/* 3D Avatar Section */}
        <div className="mt-8">
          <Canvas className="h-64 w-64">
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </Canvas>
        </div>

        {/* Raise Request Button */}
        <div className="mt-8">
          <div className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg cursor-pointer">
            Raise Blood/Plasma Request
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-col items-center">
            <FaTrophy className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-lg font-bold">500 Points</h3>
            <p className="text-gray-600 text-sm">Your Reward Points</p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-col items-center">
            <FaHeartbeat className="text-red-500 text-4xl mb-2" />
            <h3 className="text-lg font-bold">{donationHistory.length}</h3>
            <p className="text-gray-600 text-sm">Total Donations</p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-col items-center">
            <FaHandHoldingHeart className="text-green-500 text-4xl mb-2" />
            <h3 className="text-lg font-bold">Eligible</h3>
            <p className="text-gray-600 text-sm">Next Donation Date</p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-col items-center">
            <FaCalendarAlt className="text-blue-500 text-4xl mb-2" />
            <h3 className="text-lg font-bold">{events.length}</h3>
            <p className="text-gray-600 text-sm">Upcoming Events</p>
          </div>
        </div>

        {/* Donation History */}
        <div className="mt-10 p-6 bg-gray-100 rounded-lg w-full max-w-2xl shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Your Donation History
          </h2>
          {donationHistory.length > 0 ? (
            <ul className="text-gray-700">
              {donationHistory.map((donation, index) => (
                <li key={index} className="border-b border-gray-300 py-3">
                  <span className="font-bold">{donation.date}:</span> Donated{" "}
                  {donation.amount}ml to {donation.hospital}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No donations made yet.</p>
          )}
        </div>

        {/* Upcoming Events Carousel */}
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="text-xl font-bold text-red-600 mb-3">
            Upcoming Events
          </h2>
          <div className="overflow-x-auto flex space-x-4 p-2">
            {events.length > 0 ? (
              events.map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-5 rounded-lg min-w-[200px] shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {event.date} at {event.location}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No upcoming events.</p>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center max-w-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Help Save More Lives!
          </h2>
          <p className="text-gray-700 mb-4">
            Every drop counts. Donate blood and plasma regularly to make a
            difference.
          </p>
          <div className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg shadow-md cursor-pointer">
            Find a Donation Center
          </div>
        </div>
      </div>
    </div>
  );
}
