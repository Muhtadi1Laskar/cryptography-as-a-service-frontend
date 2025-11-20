import { useState } from "react";
import FormGroups from "../../shared/Form.jsx";
import ResultCard from "../../ui/ResultCard.jsx";
import { postAPI } from "../../../hooks/useApi.js";
import ButtonGroup from "../../ui/Button.jsx";

const TYPES = [
  { value: "encrypt", text: "Encrypt" },
  { value: "decrypt", text: "Decrypt" },
];

export default function AesForm() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [operationType, setOperationType] = useState("Encrypt");
  const [label, setLabel] = useState("Enter the Text");
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

    if (name === "type") updateOperation(value);
  };

  const updateOperation = (operation) => {
    const operationName = operation.charAt(0).toUpperCase() + operation.slice(1);
    const type = operation === "encrypt" ? "Text" : "Cipher Text";
    setOperationType(operationName);
    setLabel(`Enter the ${type}:`);
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

    try {
      const res = await postAPI(`aes/text/${type}`, requestBody);
      setResponse(res?.data?.cipherText || res?.data?.text);
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
      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
        {operationType}
      </h2>

      <form onSubmit={handleSumbit}>
        {/* Data input */}
        <FormGroups
          label={label}
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
        
        <br />

        {/* Submit button */}
        <ButtonGroup
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:bg-blue-300"
          disabled={loading}
          message={operationType}
        />
      </form>

      {/* Result */}
      {response && <ResultCard title="Result: " data={response} />}
    </div>
  );
}
