import { useState } from "react";
import { postAPI } from "../../hooks//useApi.js";
import { algorithms } from "../../utils/algorithmList.js";
import ResultCard from "../ui/ResultCard.jsx";
import FormGroups from "../shared/Form.jsx";

export default function VerifyHashForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({
    hash: "",
    data: "",
    algorithm: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const { hash, data, algorithm } = formData;
      const requestBody = {
        hash,
        data,
        algorithm,
      };
      const response = await postAPI("hash/text/verify", requestBody);
      const isSameHash = response?.data?.isSame
        ? "Hash Matched with the data"
        : "Hash didn't match with the data";
        
      setResponse(isSameHash);
    } catch (error) {
      console.error("Error handling data: ", error.response.data);
      console.log();
      setResponse(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
        Verify Hash
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hash input */}
        <FormGroups
          label="Hash:"
          id="hash"
          name="hash"
          type="textarea"
          placeholder="Enter hash data here"
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Data input */}
        <FormGroups
          label="Data:"
          id="data"
          name="data"
          type="textarea"
          placeholder="Enter data here"
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Algorithm select */}
        <FormGroups
          label="Hash Algorithm:"
          id="algorithm"
          name="algorithm"
          type="select"
          options={algorithms}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-950 text-white font-medium rounded-lg shadow hover:bg-blue-950 transition-all disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Generate Hash"}
        </button>
      </form>

      {response && <ResultCard title="Verification" data={response} />}
    </div>
  );
}
