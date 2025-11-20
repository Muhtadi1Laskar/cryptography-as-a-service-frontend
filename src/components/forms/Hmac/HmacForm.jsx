import { useState } from "react";
import FormGroups from "../../shared/Form.jsx";
import ResultCard from "../../ui/ResultCard.jsx";
import { postAPI } from "../../../hooks/useApi.js";
import ButtonGroup from "../../ui/Button.jsx";
import { algorithms } from "../../../utils/algorithmList.js";

export default function HmacForm() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    data: "",
    secretKey: "",
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

    const { data, secretKey, algorithm } = formData;
    const requestBody = {
      data,
      secretKey,
      hash: algorithm,
    };

    try {
      const res = await postAPI("hmac/generate", requestBody);
      setResponse(res?.data?.hmac);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
      setResponse(error.response?.data?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Hmac Generator
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Data input */}
        <FormGroups
          label="Enter you data"
          id="data"
          name="data"
          type="textarea"
          placeholder="Write here"
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Secret Key input */}
        <FormGroups
          label="Enter the Secret Key:"
          id="secretKey"
          name="secretKey"
          type="input"
          placeholder="Enter the key"
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Algorithm Select */}
        <FormGroups
          label="Hash Algorithm:"
          id="algorithm"
          name="algorithm"
          type="select"
          options={algorithms}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <br />

        {/* Submit */}
        <ButtonGroup
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:bg-blue-300"
          disabled={loading}
          message="Generate Hash"
        />
      </form>

      {/* Result Card */}
      {response && <ResultCard title="Hmac" data={response} />}
    </div>
  );
}
