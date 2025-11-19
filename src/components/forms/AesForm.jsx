import { useState } from "react";
import { postAPI } from "../../hooks/useApi.js";
import FormGroups from "../shared/Form";
import ResultCard from "../ui/ResultCard";
import ButtonGroup from "../ui/Button";

const TYPES = [
  { value: "encrypt", text: "Encrypt" },
  { value: "decrypt", text: "Decrypt" },
];

export default function AesForm() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    data: "",
    key: "",
    type: "encrypt",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    const { data, key, type } = formData;
    const keyName = type === "encrypt" ? "text" : "cipherText";
    const requestBody = {
      [keyName]: data,
      secretKey: key,
    };

    console.log("Form Data: ", formData);
    console.log("Request Body: ", requestBody);

    try {
      const res = await postAPI(`aes/text/${type}`, requestBody);
      console.log(res.data);
      setResponse(res?.data?.cipherText || res?.data?.text);
    } catch (error) {
      console.log(error.message);
      console.error("Failed to fetch data: ", error);
      setResponse(error.response?.data?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
        Encrypt / Decrypt
      </h2>

      <form onSubmit={handleSumbit}>
        {/* Data input */}
        <FormGroups
          label="Enter the Data:"
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
          id="key"
          name="key"
          type="input"
          placeholder="Enter the key"
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Type select */}
        <FormGroups
          label="Type:"
          id="type"
          name="type"
          type="select"
          options={TYPES}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Submit button */}
        <ButtonGroup
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:bg-blue-300"
          disabled={loading}
          message={formData["type"]}
        />
      </form>

      {/* Result */}
      {response && <ResultCard title="Result: " data={response} />}
    </div>
  );
}
