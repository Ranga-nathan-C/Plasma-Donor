import { useState, useEffect } from "react";
import axios from "axios";

function PlasmaRequestForm({ userId }) {
  const [requestType, setRequestType] = useState("self");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    requesterName: "",
    bloodGroup: "",
    location: "",
    contact: "",
    urgency: "Normal",
    relation: "",
    hospitalName: "",
    requesterId: "",
    numberOfPatients: 1,
    message: "",
  });

  // Fetch user details when request type is "self"
  useEffect(() => {
    if (requestType === "self") {
      axios
        .get(`http://localhost:5000/api/user/${userId}`)
        .then((response) => {
          const user = response.data;
          setFormData((prev) => ({
            ...prev,
            patientName: user.name,
            bloodGroup: user.bloodGroup,
            location: user.location,
            contact: user.contact,
          }));
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [requestType, userId]);

  // Get geolocation for self-request
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          location: `${position.coords.latitude}, ${position.coords.longitude}`,
        }));
      });
    } else {
      alert("Geolocation not supported.");
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle request type change
  const handleRequestTypeChange = (e) => {
    setRequestType(e.target.value);
    setSuccess(null);
    if (e.target.value === "self") {
      fetchLocation();
    } else {
      setFormData((prev) => ({
        ...prev,
        patientName: "",
        requesterName: "",
        bloodGroup: "",
        location: "",
        contact: "",
        relation: "",
        hospitalName: "",
        requesterId: "",
        numberOfPatients: 1,
        message: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/plasma-request", formData);
      setSuccess("Request submitted successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting request:", error);
      setSuccess("Failed to submit request.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-md bg-white dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        Raise a Plasma Request
      </h2>

      {success && (
        <div
          className={`p-2 text-center ${
            success.includes("Failed") ? "text-red-500" : "text-green-500"
          }`}
        >
          {success}
        </div>
      )}

      {/* Select Request Type */}
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Request Type:</label>
        <select
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
          value={requestType}
          onChange={handleRequestTypeChange}
        >
          <option value="self">For Myself</option>
          <option value="others">For Someone Else</option>
          <option value="hospital">Hospital Request</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Self Request - Fetch User Details */}
        {requestType === "self" && (
          <>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              className="w-full p-2 border rounded mb-2"
              disabled
            />
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              className="w-full p-2 border rounded mb-2"
              disabled
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              className="w-full p-2 border rounded mb-2"
              disabled
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              className="w-full p-2 border rounded mb-2"
              disabled
            />
          </>
        )}

        {/* Request for Someone Else */}
        {requestType === "others" && (
          <>
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="requesterName"
              placeholder="Your Name (Requester)"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="relation"
              placeholder="Relation to Patient"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* Hospital Request */}
        {requestType === "hospital" && (
          <>
            <input
              type="text"
              name="hospitalName"
              placeholder="Hospital Name"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="requesterId"
              placeholder="Requester ID"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="numberOfPatients"
              placeholder="Number of Patients"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Required Blood Group"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Hospital Location"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="w-full p-2 border rounded mb-2"
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* Urgency Level */}
        <select
          name="urgency"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
        </select>

        {/* Additional Message */}
        <textarea
          name="message"
          placeholder="Additional Message (Optional)"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

export default PlasmaRequestForm;
