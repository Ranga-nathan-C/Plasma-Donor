import React, { useState } from "react";
import { FaHandHoldingWater, FaHeartbeat } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

const PlasmaChatBot = ({ apiKey }) => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    setIsQuestionOpen(false);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `
You are PlasmaBot, an AI assistant for our Plasma Donation website.
Only answer questions related to:
1. Plasma donation process.
2. Eligibility, donation centers, and health tips.
3. Our website features:
   - Emergency Alert System for real-time donor requests.
   - Reward System where donors earn points and receive benefits.
   - Community Support for connecting donors and recipients.
Do NOT answer anything unrelated to plasma or our services.
Be clear and concise (max 4 lines).
`;

    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "user", parts: [{ text: prompt }] },
          ],
        }),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();
      console.log("API Response:", data);

      const fullText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response available. Try again!";

      setResponses((prevResponses) => [
        ...prevResponses,
        `🧑‍💻 You: ${prompt}`,
        `🤖 PlasmaBot: ${fullText}`,
      ]);
      setPrompt("");
    } catch (error) {
      console.error("Error generating text:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        `🧑‍💻 You: ${prompt}`,
        `❗ PlasmaBot: There was an error. Please try again later.`,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "How to become a plasma donor?",
    "Who can receive plasma?",
    "Where can I donate plasma?",
    "What are the eligibility criteria?",
  ];

  return (
    <div>
      {/* Floating button */}
      <div
        className="fixed p-4 bg-red-500 rounded-full shadow-lg cursor-pointer bottom-4 right-4 hover:bg-red-600 transition"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <FaHandHoldingWater className="text-white" size={28} />
      </div>

      {isChatOpen && (
        <div
          className="fixed z-50 flex flex-col bg-white border border-gray-300 shadow-2xl rounded-xl bottom-4 right-4
          w-[90%] sm:w-80 md:w-96 max-w-full
          h-[70vh] sm:h-[500px] 
          "
        >
          {/* Header */}
          <div className="relative flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-t-xl">
            <FaHeartbeat className="mr-2" size={30} />
            <h2 className="text-sm sm:text-base md:text-lg font-semibold">
              Plasma Donation Chat
            </h2>
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-3 right-4 text-white hover:text-gray-200"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
            {responses.map((response, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 text-xs sm:text-sm rounded-lg ${
                    index % 2 === 0
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {response}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-400 text-sm">Typing...</div>
            )}
          </div>

          {/* Quick Questions */}
          {isQuestionOpen ? (
            <div className="flex flex-wrap justify-start p-2 bg-white border-t border-gray-200 gap-2 relative">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(question)}
                  className="text-xs px-3 py-1 border rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  {question}
                </button>
              ))}
              <button
                onClick={() => setIsQuestionOpen(false)}
                className="absolute top-2 right-2 text-black hover:text-gray-500"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center py-2">
              <button
                onClick={() => setIsQuestionOpen(true)}
                className="text-xs px-3 py-1 border rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                Questions
              </button>
            </div>
          )}

          {/* Input field */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-3 bg-white border-t border-gray-300"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 p-2 text-xs sm:text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ask about plasma donation..."
            />
            <button
              type="submit"
              className="p-2 ml-2 text-white bg-red-500 rounded-r-lg hover:bg-red-600 transition"
            >
              <IoSend size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlasmaChatBot;
