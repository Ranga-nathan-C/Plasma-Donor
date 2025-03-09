import React, { useState } from "react";
import { HeartPulse, Activity, Shield, Droplet } from "lucide-react";
import {  Microscope, ShieldCheck } from "lucide-react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);

   const donationLayers = [
     {
       title: "Cellular Level",
       icon: <Microscope className="w-16 h-16 text-blue-500" />,
       description:
         "Plasma contains crucial proteins and antibodies that support medical treatments",
       color: "bg-blue-50",
       details: [
         "Contains essential proteins",
         "Carries nutrients and hormones",
         "Supports immune system functions",
       ],
     },
     {
       title: "Medical Impact",
       icon: <HeartPulse className="w-16 h-16 text-red-500" />,
       description:
         "Plasma is critical for treating various medical conditions",
       color: "bg-red-50",
       details: [
         "Helps treat rare diseases",
         "Used in emergency medical treatments",
         "Supports patients with immune disorders",
       ],
     },
     {
       title: "Life Saving",
       icon: <ShieldCheck className="w-16 h-16 text-green-500" />,
       description: "One donation can potentially save multiple lives",
       color: "bg-green-50",
       details: [
         "Supports cancer treatments",
         "Critical for burn victims",
         "Helps patients with blood disorders",
       ],
     },
   ];


  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 shadow-md bg-red-50">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          <div className="flex items-center">
            <HeartPulse className="mr-2 text-red-500" size={40} />
            <span className="text-2xl font-bold text-red-600">PlasmaCare</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-red-600 transition hover:text-red-800">
              Home
            </a>
            <a
              href="#AboutUs"
              className="text-red-600 transition hover:text-red-800"
            >
              About Us
            </a>
            <a
              href="#FAQ"
              className="text-red-600 transition hover:text-red-800"
            >
              FAQ
            </a>
          </div>
          <div className="space-x-2">
            <a
              href="/Login"
              className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Login
            </a>
            <a
              href="/Register"
              className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container grid items-center gap-8 px-4 py-16 mx-auto md:grid-cols-2">
        <div className="space-y-6">
          <h1
            className="text-5xl font-extrabold text-red-600 animate-pulse"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered
              ? "Every Drop Saves a Life"
              : "Donate Plasma & Save Life"}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Donating plasma is a safe and easy process. Our team of experienced
            medical professionals will guide you through every step, ensuring
            your safety and comfort.
          </p>
          <button className="flex items-center px-6 py-3 space-x-2 text-white transition transform bg-red-500 rounded-full hover:bg-red-600 hover:scale-105 group">
            <Droplet className="group-hover:animate-bounce" />
            <span>Donate Now</span>
          </button>
        </div>

        <div className="relative w-full h-[500px] flex justify-center items-center">
          {/* Central Plasma Droplet */}
          <div
            className="absolute z-10 flex items-center justify-center transition-all duration-300 transform rounded-full shadow-2xl cursor-pointer w-60 h-60 bg-gradient-to-br from-red-100 to-red-300 hover:scale-110 animate-pulse"
          >
            <Droplet className="text-white h-28 w-30" />
          </div>

          {/* Orbiting Information Layers */}
          {donationLayers.map((layer, index) => {
            const angle = (index * Math.PI * 2) / donationLayers.length;
            const radius = 250;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex: activeLayer === index ? 20 : 10,
                }}
                className={`
                absolute w-56 h-56 rounded-full p-6 
                transition-all duration-500 ease-in-out
                flex flex-col justify-center items-center
                ${
                  activeLayer === index
                    ? "scale-110 shadow-2xl ring-4 ring-opacity-50 ring-blue-500"
                    : "hover:scale-105 opacity-80 shadow-lg"
                }
                ${layer.color}
                cursor-pointer
              `}
                onClick={() =>
                  setActiveLayer(activeLayer === index ? null : index)
                }
              >
                {layer.icon}
                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  {layer.title}
                </h3>
                {activeLayer === index && (
                  <div className="mt-4 text-center animate-fade-in">
                    {layer.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="mb-1 text-sm text-gray-700"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>


      </div>

      {/* Donor Eligibility */}
      <div className="py-16 bg-red-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-red-600">
            Plasma Donor Eligibility
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Eligibility Cards */}
            {[
              {
                icon: <Shield className="text-red-500" size={48} />,
                title: "Age",
                description: "Between 18-65 years old",
              },
              {
                icon: <Activity className="text-red-500" size={48} />,
                title: "Weight",
                description: "50kg (110 lbs) or above",
              },
              // Add more eligibility criteria
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 transition transform bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2"
              >
                {item.icon}
                <h3 className="mt-4 text-xl font-semibold text-red-600">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-red-100">
        <div className="container grid gap-8 px-4 mx-auto md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-red-600">PlasmaCare</h3>
            <p className="text-gray-700">
              Connecting donors with those in need, one plasma donation at a
              time.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-red-600">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-red-600">
                Home
              </a>
              <a
                href="#AboutUs"
                className="block text-gray-600 hover:text-red-600"
              >
                About Us
              </a>
              <a href="#FAQ" className="block text-gray-600 hover:text-red-600">
                FAQ
              </a>
            </nav>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-red-600">Contact Us</h4>
            <p className="text-gray-700">Email: plasmadonor@gmail.com</p>
            <p className="text-gray-700">Phone: 123-456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
