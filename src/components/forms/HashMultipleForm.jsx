import { useState } from "react";
import { postAPI } from "../../hooks/useApi.js";
import ResultCard from "../ui/ResultCard.jsx";
import { algorithms } from "../../utils/algorithmList.js";
import FormGroups from "../shared/Form.jsx";
import ButtonGroup from "../ui/Button.jsx";

export default function HashMultipleForm() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [formData, setFormData] = useState({
    data: "",
    algorithms: [],
  });

  // Handle text input / textarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multiple selection
  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );

    setFormData((prev) => ({
      ...prev,
      algorithms: selected,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await postAPI("hash/text/multiple", formData);
      setResponse(res.data);
    } catch (err) {
      console.error("Error handling data: ", err);
      setResponse({ error: err.response?.data?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">
        Multiple Hash Generator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data input */}
        <FormGroups
          label="Data to Hash:"
          id="data"
          name="data"
          type="textarea"
          placeholder="Write your data here..."
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Multiple Algorithm Select */}
        <div>
          <label
            htmlFor="algorithms"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Select Hash Algorithms
          </label>

          <select
            multiple
            id="algorithms"
            name="algorithms"
            value={formData.algorithms}
            onChange={handleMultiSelect}
            className="
              w-full
              h-40
              p-3
              border border-gray-300
              rounded-xl
              bg-white
              text-gray-800
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              shadow-sm
              hover:border-gray-400
              transition
              cursor-pointer
              scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
            "
          >
            <option disabled>Select algorithms...</option>

            {algorithms.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <ButtonGroup
          type="submit"
          className="w-full py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:bg-blue-300"
          disabled={loading}
          message="Generate Hashes"
        />
      </form>

      {/* Results */}
      {response?.results && (
        <div className="space-y-4 mt-6">
          {response.results.map((item, idx) => {
            const algorithm = Object.keys(item)[0]; // dynamic key
            const hash = item[algorithm];

            return <ResultCard key={idx} title={algorithm} data={hash} />;
          })}
        </div>
      )}

      {response?.error && (
        <p className="text-red-600 font-medium mt-4">{response.error}</p>
      )}
    </div>
  );
}
