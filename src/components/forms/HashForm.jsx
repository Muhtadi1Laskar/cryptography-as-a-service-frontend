import { useState } from "react";
import { postAPI } from "../../hooks/useApi.js";
import ResultCard from "../ui/ResultCard.jsx";
import { algorithms } from "../../utils/algorithmList.js";

export default function HashForm() {
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({
    data: "",
    algorithm: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponse("");

    try {
      const { data, algorithm } = formData;
      const requestBody = {
        data,
        algorithm,
      };
      const response = await postAPI("hash/text", requestBody);
      setResponse(response.data.hash);
    } catch (error) {
      console.error("Error handling data: ", error.response.data.message);
      setResponse(error.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-800">Hash Generator</h2>

        <div className="space-y-2">
          <label htmlFor="data" className="text-sm font-medium text-gray-700">
            Data to Hash
          </label>

          <textarea
            id="data"
            name="data"
            rows="4"
            placeholder="Write your data here..."
            value={formData.data}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="algorithm"
            className="text-sm font-medium text-gray-700"
          >
            Hash Algorithm
          </label>

          <select
            id="algorithm"
            name="algorithm"
            value={formData.algorithm}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {algorithms.map((opt, idx) => {
              return (
                <option key={idx} value={opt.value}>
                  {opt.text}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition shadow-sm"
        >
          Generate Hash
        </button>
      </form>

      {response && <ResultCard title="Hash Result" data={response} />}
    </div>
  );
}
