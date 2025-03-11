import React, { useState } from "react";
import {
  HeartPulse,
  Activity,
  Shield,
  Droplet,
  Microscope,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const donationLayers = [
    {
      title: "Cellular Level",
      icon: <Microscope className="w-12 h-12 text-blue-500 md:w-16 md:h-16" />,
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
      icon: <HeartPulse className="w-12 h-12 text-red-500 md:w-16 md:h-16" />,
      description: "Plasma is critical for treating various medical conditions",
      color: "bg-red-50",
      details: [
        "Helps treat rare diseases",
        "Used in emergency medical treatments",
        "Supports patients with immune disorders",
      ],
    },
    {
      title: "Life Saving",
      icon: (
        <ShieldCheck className="w-12 h-12 text-green-500 md:w-16 md:h-16" />
      ),
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
    <div className="bg-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 shadow-md bg-red-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center">
            <HeartPulse className="mr-2 text-red-500" size={32} />
            <span className="text-xl font-bold text-red-600 md:text-2xl">
              PlasmaCare
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:space-x-6">
            <a href="#" className="text-red-600 hover:text-red-800">
              Home
            </a>
            <a href="#AboutUs" className="text-red-600 hover:text-red-800">
              About Us
            </a>
            <a
              href="/ContactUs"
              className="block text-gray-600 hover:text-red-600"
            >
              Contact Us
            </a>
            <a href="#FAQ" className="text-red-600 hover:text-red-800">
              FAQ
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-red-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Action Buttons */}
          <div className="hidden md:flex md:space-x-3">
            <a
              href="/Login"
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Login
            </a>
            <a
              href="/Register"
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Sign Up
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <a href="#" className="block hover:text-red-800 text-red-600">
              Home
            </a>
            <a
              href="#AboutUs"
              className="block text-red-600 hover:text-red-800"
            >
              About Us
            </a>
            <a
              href="/ContactUs"
              className="block text-gray-600 hover:text-red-600"
            >
              Contact Us
            </a>
            <a href="#FAQ" className="block text-red-600 hover:text-red-800">
              FAQ
            </a>
            <div className="flex space-x-2 mt-4">
              <a
                href="/Login"
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Login
              </a>
              <a
                href="/Register"
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-red-600 animate-pulse text-center md:text-left"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered
              ? "Every Drop Saves a Life"
              : "Donate Plasma & Save Life"}
          </h1>
          <p className="text-gray-700 text-center md:text-left leading-relaxed">
            Donating plasma is a safe and easy process. Our team of experienced
            medical professionals will guide you through every step, ensuring
            your safety and comfort.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="flex items-center px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-105 transition transform group">
              <Droplet className="mr-2 group-hover:animate-bounce" />
              Donate Now
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
          {/* Central Plasma Droplet */}
          <div className="absolute z-10 flex justify-center items-center w-52 h-52 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-red-100 to-red-300 shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse cursor-pointer">
            <Droplet className="text-white w-20 h-20 md:w-28 md:h-28" />
          </div>

          {/* Orbiting Info Circles */}
          {donationLayers.map((layer, index) => {
            const angle = (index * Math.PI * 2) / donationLayers.length;
            const radius = 180;
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
                  absolute w-40 h-40 md:w-56 md:h-56 p-4 md:p-6 rounded-full flex flex-col justify-center items-center transition-all duration-400 ease-in-out
                  ${layer.color} cursor-pointer
                  ${
                    activeLayer === index
                      ? "scale-110 shadow-2xl ring-2 ring-opacity-50 ring-red-200"
                      : "hover:scale-105 opacity-90 shadow-lg"
                  }
                `}
                onClick={() =>
                  setActiveLayer(activeLayer === index ? null : index)
                }
              >
                {layer.icon}
                <h3 className="mt-2 md:mt-4 text-center text-sm md:text-lg font-bold text-gray-800">
                  {layer.title}
                </h3>
                {activeLayer === index && (
                  <div className="mt-2 md:mt-4 text-xs md:text-sm text-center animate-fade-in">
                    {layer.details.map((detail, i) => (
                      <p key={i} className="mb-1 text-gray-700">
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-red-600 mb-12">
            Plasma Donor Eligibility
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              {
                icon: <ShieldCheck className="text-red-500" size={48} />,
                title: "Health",
                description: "Good overall health required",
              },
              {
                icon: <Droplet className="text-red-500" size={48} />,
                title: "Donation Interval",
                description: "Once every 28 days",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition"
              >
                {item.icon}
                <h3 className="mt-4 text-lg font-semibold text-red-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-100 py-12">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">PlasmaCare</h3>
            <p className="text-gray-700">
              Connecting donors with those in need, one plasma donation at a
              time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="/" className="block text-gray-600 hover:text-red-600">
                Home
              </a>
              <a
                href="#AboutUs"
                className="block text-gray-600 hover:text-red-600"
              >
                About Us
              </a>
              <a
                href="/ContactUs"
                className="block text-gray-600 hover:text-red-600"
              >
                Contact Us
              </a>
              <a href="#FAQ" className="block text-gray-600 hover:text-red-600">
                FAQ
              </a>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 mb-4">Contact Us</h4>
            <p className="text-gray-700">Email: plasmadonor@gmail.com</p>
            <p className="text-gray-700">Phone: 123-456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
