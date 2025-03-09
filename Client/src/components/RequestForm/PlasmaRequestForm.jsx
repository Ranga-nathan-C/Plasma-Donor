import { useEffect, useInsertionEffect, useState } from "react";
import { Info, MapPin, Heart, Droplet, Clock } from "lucide-react";
import axios from "axios";
import { HeartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircle, Settings, LogOut } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const PlasmaRequestForm = () => {
  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;
  const userId = JSON.parse(sessionStorage.getItem("user")).user.id;

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [requestType, setRequestType] = useState("self");
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    location: "",
    contact: "",
    requesterName: "",
    relation: "",
    hospitalName: "",
    numberOfPatients: "",
    urgency: "Normal",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    handleRequestTypeChange(self);
  }, []);

  const getCurrentLocation = () => {
    setLoading1(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocode to get human-readable address (Using OpenStreetMap API)
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const address = res.data.display_name;
          setFormData((prev) => ({ ...prev, location: address }));
          setLoading1(false);
        } catch (err) {
          setError("Failed to fetch location details.");
        }
      },
      (err) => {
        setError("Location access denied. Please enter manually.");
      }
    );
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/details/${user_id}`
      );
      const userData = response.data;
      console.log(userData);
      setFormData({
        patientName: userData.name,
        bloodGroup: userData.blood_type,
        location: userData.address,
        contact: userData.phonenumber,
        requesterName: "",
        relation: "",
        hospitalName: "",
        numberOfPatients: 0,
        urgency: "Normal",
        message: "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleRequestTypeChange = (type) => {
    setRequestType(type);

    if (type === "self") {
      fetchUserData(); // Fetch user details
    } else {
      setFormData({
        patientName: "",
        bloodGroup: "",
        location: "",
        contact: "",
        requesterName: "",
        relation: "",
        hospitalName: "",
        numberOfPatients: 0,
        urgency: "Normal",
        message: "",
      });
    }
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/userstatus${userId}`, {
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
      return await response.json();
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct request data dynamically, excluding empty values

    console.log(formData);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/request/create/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Request submitted! Notifications sent.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        console.log(errorData);
      }
    } catch (error) {
      alert("Request failed. Please try again.");
    }
  };

  const donationResources = [
    {
      icon: <Droplet className="w-6 h-6 text-red-500" />,
      title: "Plasma Donation Facts",
      description: "One plasma donation can help up to 3 patients in need.",
      link: "https://www.redcrossblood.org/donate-blood/how-to-donate/types-of-blood-donations/plasma-donation.html",
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Who Can Donate",
      description:
        "Most healthy adults can donate. Age and weight requirements apply.",
      link: "https://www.mayoclinic.org/healthy-lifestyle/health-management/in-depth/donate-plasma/art-20045406",
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: "Donation Process",
      description: "Typically takes 1-2 hours. Compensation may be available.",
      link: "https://www.donatingplasma.org/donation/the-donation-process",
    },
  ];

  return (
    <div>
      <nav className="top-0 z-50 bg-white shadow-md ">
        <div className="container flex items-center justify-between p-2 mx-auto">
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
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-2xl rounded-2xl md:grid-cols-3">
          {/* Donation Resources Sidebar */}
          <div className="p-6 text-white md:col-span-1 bg-gradient-to-br from-red-600 to-red-800">
            <h3 className="flex items-center gap-3 mb-6 text-2xl font-bold">
              <Info className="w-8 h-8" /> Donation Resources
            </h3>
            <div className="space-y-4">
              {donationResources.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 transition-all border rounded-lg bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {resource.icon}
                    <h4 className="text-lg font-semibold">{resource.title}</h4>
                  </div>
                  <p className="mb-3 text-sm opacity-80">
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-xs text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
                  >
                    Learn More
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Plasma Request Form */}
          <div className="p-6 md:col-span-2 md:p-10">
            <h2 className="mb-6 text-3xl font-extrabold tracking-widest text-center text-red-700 uppercase">
              Request Plasma Donation
            </h2>

            {/* Request Type Selection */}
            <div className="flex justify-center gap-4 mb-6">
              {["self", "others", "hospital"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    requestType === type
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleRequestTypeChange(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Success/Error Message */}
            {success && (
              <div
                className={`p-3 text-center font-medium rounded-lg text-lg mb-4 ${
                  success.includes("Failed")
                    ? "bg-red-100 text-red-700 border border-red-500"
                    : "bg-green-100 text-green-700 border border-green-500"
                }`}
              >
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                      disabled={requestType === "self"}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Blood Group
                    </label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                      disabled={requestType === "self"}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <h2
                      className="flex items-center gap-2 text-base font-semibold text-red-600 cursor-pointer hover:underline"
                      onClick={getCurrentLocation}
                    >
                      Get My Location{" "}
                      <MapPin className="w-5 h-5 text-red-600" />
                      {loading1 && (
                        <>
                          <svg
                            className="w-5 h-5 mr-3 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </>
                      )}
                    </h2>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Contact
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                      disabled={requestType === "self"}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {requestType === "others" && (
                    <>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Requester Name
                        </label>
                        <input
                          type="text"
                          name="requesterName"
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Relation to Patient
                        </label>
                        <input
                          type="text"
                          name="relation"
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          required
                        />
                      </div>
                    </>
                  )}

                  <>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Hospital Name
                      </label>
                      <input
                        type="text"
                        name="hospitalName"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                    {requestType === "hospital" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Number of Patients
                        </label>
                        <input
                          type="number"
                          name="numberOfPatients"
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          required
                        />
                      </div>
                    )}
                  </>
                </div>

                {/* Full Width Inputs */}
                <div className="col-span-1 space-y-4 md:col-span-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      rows="4"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-3 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-3 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlasmaRequestForm;
