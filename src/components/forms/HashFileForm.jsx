import { useState } from "react";
// import FormGroup from "../ui/FormGroup";
import { algorithms } from "../../utils/algorithmList.js";
import FormGroups from "../shared/Form.jsx";
import ResultCard from "../ui/ResultCard.jsx";
import { postAPI } from "../../hooks/useApi.js";
import ButtonGroup from "../ui/Button.jsx";

export default function HashFileForm() {
  const [formData, setFormData] = useState({
    algorithm: "sha256",
    file: null,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return;

    setLoading(true);
    setResult(null);

    try {
      const fd = new FormData();
      fd.append("file", formData.file);
      fd.append("hash", formData.algorithm);

      const res = await postAPI("hash/file", fd);
      const data = res.data;
      setResult(data.hash || data?.message);
    } catch (err) {
      console.error("Failed to process file: ", err);
      setResult({ error: "Failed to process file." });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        File Hashing Tool
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Algorithm Select */}
        <div>
          <FormGroups
            label="Hash Algorithm:"
            id="algorithm"
            name="algorithm"
            type="select"
            options={algorithms}
            formData={formData}
            handleInputChange={handleChange}
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
            onChange={handleChange}
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
          message="Generate Hash"
        />
      </form>

      {/* Result Card */}
      {result && <ResultCard title="Hash" data={result} />}
    </div>
  );
}
