import { useState } from "react";
import { algorithms } from "../../../utils/algorithmList.js";
import FormGroups from "../../shared/Form.jsx";
import ResultCard from "../../ui/ResultCard.jsx";
import { postAPI } from "../../../hooks/useApi.js";
import ButtonGroup from "../../ui/Button.jsx";

export default function HashForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
        Hash Generator
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data input */}
        <FormGroups
          label="Data to Hash:"
          id="data"
          name="data"
          type="textarea"
          placeholder="Enter data data here"
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

        {/* Submit button */}
        <ButtonGroup
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:bg-blue-300"
          disabled={loading}
          message="Generate Hash"
        />
      </form>

      {/* Result */}
      {response && <ResultCard title="Hash Result" data={response} />}
    </div>
  );
}
