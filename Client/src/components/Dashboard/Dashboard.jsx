import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaTint,
  FaInfoCircle,
  FaHeart,
} from "react-icons/fa";
import Navbar from "./Navbar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [events, setEvents] = useState([]);

  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/users/details/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50">
      <Navbar />
      <div className="container flex flex-col items-center px-4 py-10 mx-auto">
        {/* Welcome Card */}
        <motion.div
          className="w-full max-w-3xl p-8 text-center bg-white shadow-lg rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-red-600">
            Hello, {userData?.name || "User"} ❤️
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {userData?.bio || "No bio available"}
          </p>
        </motion.div>

        {/* User Information Cards */}
        <motion.div
          className="grid w-full max-w-4xl grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InfoCard
            icon={<FaEnvelope />}
            label="Email"
            value={userData?.email || "Not provided"}
          />
          <InfoCard
            icon={<FaPhone />}
            label="Phone"
            value={userData?.phonenumber || "Not provided"}
          />
          <InfoCard
            icon={<FaBirthdayCake />}
            label="DOB"
            value={userData?.dob || "Not provided"}
          />
          <InfoCard
            icon={<FaUser />}
            label="Gender"
            value={userData?.gender || "Not provided"}
          />
          <InfoCard
            icon={<FaTint />}
            label="Blood Type"
            value={userData?.blood_type || "Not provided"}
          />
          <InfoCard
            icon={<FaMapMarkerAlt />}
            label="Address"
            value={userData?.address || "Not provided"}
          />
          <InfoCard
            icon={<FaInfoCircle />}
            label="Interests"
            value={userData?.interests || "Not provided"}
          />
          <InfoCard
            icon={<FaHeart />}
            label="Social Media"
            value={userData?.social_media_links || "Not provided"}
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="w-full max-w-xl px-8 py-4 mt-8 text-xl font-bold text-center text-white bg-red-500 rounded-lg shadow-md cursor-pointer hover:bg-red-600"
          whileHover={{ scale: 1.05 }}
        >
          Raise Blood/Plasma Request
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid w-full max-w-4xl grid-cols-2 gap-6 mt-10 md:grid-cols-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard
            icon={<FaTrophy className="text-yellow-500" />}
            label="Reward Points"
            value="500"
          />
          <StatCard
            icon={<FaTint className="text-red-500" />}
            label="Total Donations"
            value={donationHistory.length}
          />
          <StatCard
            icon={<FaHeart className="text-green-500" />}
            label="Next Donation"
            value="Eligible"
          />
          <StatCard
            icon={<FaInfoCircle className="text-blue-500" />}
            label="Upcoming Events"
            value={events.length}
          />
        </motion.div>

        {/* Donation History */}
        <motion.div
          className="w-full max-w-2xl p-6 mt-10 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-3 text-xl font-bold text-red-600">
            Your Donation History
          </h2>
          {donationHistory.length > 0 ? (
            <ul className="text-gray-700">
              {donationHistory.map((donation, index) => (
                <li key={index} className="py-3 border-b border-gray-300">
                  <span className="font-bold">{donation.date}:</span> Donated{" "}
                  {donation.amount}ml to {donation.hospital}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No donations made yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({ icon, label, value }) {
  return (
    <motion.div
      className="flex items-center p-5 space-x-4 transition-all bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-3xl text-red-500">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{label}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value }) {
  return (
    <motion.div
      className="flex flex-col items-center p-5 transition-all bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-2 text-4xl">{icon}</div>
      <h3 className="text-lg font-bold">{value}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </motion.div>
  );
}
