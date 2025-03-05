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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        {/* Welcome Card */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-red-600">
            Hello, {userData?.name || "User"} ❤️
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {userData?.bio || "No bio available"}
          </p>
        </motion.div>

        {/* User Information Cards */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
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
          className="mt-8 w-full max-w-xl bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-md text-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Raise Blood/Plasma Request
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl"
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
          className="mt-10 p-6 bg-white rounded-lg w-full max-w-2xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-red-600 mb-3">
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
        </motion.div>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({ icon, label, value }) {
  return (
    <motion.div
      className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200 hover:shadow-lg transition-all"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-red-500 text-3xl">{icon}</div>
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
      className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center border border-gray-200 hover:shadow-lg transition-all"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-bold">{value}</h3>
      <p className="text-gray-600 text-sm">{label}</p>
    </motion.div>
  );
}
