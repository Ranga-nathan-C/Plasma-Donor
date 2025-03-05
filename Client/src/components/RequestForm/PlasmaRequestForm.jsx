import { useState } from "react";
import { Info, Heart, Droplet, Clock } from "lucide-react";

const PlasmaRequestForm = () => {
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

  const handleRequestTypeChange = (type) => {
    setRequestType(type);
    setFormData({
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
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Request submitted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }, 2000);
  };

  const donationResources = [
    {
      icon: <Droplet className="text-red-500 w-6 h-6" />,
      title: "Plasma Donation Facts",
      description: "One plasma donation can help up to 3 patients in need.",
      link: "https://www.redcrossblood.org/donate-blood/how-to-donate/types-of-blood-donations/plasma-donation.html",
    },
    {
      icon: <Heart className="text-red-500 w-6 h-6" />,
      title: "Who Can Donate",
      description:
        "Most healthy adults can donate. Age and weight requirements apply.",
      link: "https://www.mayoclinic.org/healthy-lifestyle/health-management/in-depth/donate-plasma/art-20045406",
    },
    {
      icon: <Clock className="text-red-500 w-6 h-6" />,
      title: "Donation Process",
      description: "Typically takes 1-2 hours. Compensation may be available.",
      link: "https://www.donatingplasma.org/donation/the-donation-process",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
        {/* Donation Resources Sidebar */}
        <div className="md:col-span-1 bg-gradient-to-br from-red-600 to-red-800 p-6 text-white">
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <Info className="w-8 h-8" /> Donation Resources
          </h3>
          <div className="space-y-4">
            {donationResources.map((resource, index) => (
              <div
                key={index}
                className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  {resource.icon}
                  <h4 className="font-semibold text-lg">{resource.title}</h4>
                </div>
                <p className="text-sm opacity-80 mb-3">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-xs transition-colors"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Plasma Request Form */}
        <div className="md:col-span-2 p-6 md:p-10">
          <h2 className="text-3xl font-extrabold text-red-700 text-center mb-6 uppercase tracking-widest">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                    disabled={requestType === "self"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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

                {requestType === "hospital" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  </>
                )}
              </div>

              {/* Full Width Inputs */}
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
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
  );
};

export default PlasmaRequestForm;
