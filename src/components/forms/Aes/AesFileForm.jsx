import { useState } from "react";
import FormGroups from "../../shared/Form.jsx";
import ResultCard from "../../ui/ResultCard.jsx";
import { postAPI } from "../../../hooks/useApi.js";
import ButtonGroup from "../../ui/Button.jsx";

const TYPES = [
  { value: "encrypt", text: "Encrypt" },
  { value: "decrypt", text: "Decrypt" },
];

export default function AesFileForm() {
  const [operationType, setOperationType] = useState("Encrypt");
  const [formData, setFormData] = useState({
    file: null,
    secretKey: "",
    type: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if(name === "type") updateOperation(value);
  };

  const updateOperation = (operation) => {
    const operationName = operation.charAt(0).toUpperCase() + operation.slice(1);
    setOperationType(operationName);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return;

    setLoading(true);
    setResponse(null);

    const type = formData.type;

    try {
      const fd = new FormData();
      fd.append("file", formData.file);
      fd.append("secretKey", formData.secretKey);

      const res = await postAPI(`aes/file/${type}`, fd);
      console.log(res.data);
      setResponse(res?.data?.encryptedText || res?.data?.decryptedText);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
      setResponse(error.response?.data?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        AES {operationType} File
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Algorithm Select */}
        <div>
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
        </div>

        <div>
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
        </div>

        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload File
          </label>
          <input
            type="file"
            name="file"
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>

        {/* Metadata Preview */}
        {formData.file && (
          <div className="p-3 rounded-lg bg-gray-100 border">
            <p className="text-sm text-gray-700">
              <strong>File:</strong> {formData.file.name}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Size:</strong> {(formData.file.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-sm text-gray-700">
              <strong>Type:</strong> {formData.file.type || "Unknown"}
            </p>
          </div>
        )}

        {/* Submit */}
        <ButtonGroup
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:bg-blue-300"
          disabled={loading}
          message={operationType}
        />
      </form>

      {/* Result Card */}
      {response && <ResultCard title="Hash" data={response} />}
    </div>
  );
}
