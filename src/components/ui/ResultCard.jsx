import { useState } from "react";

export default function ResultCard({ title, data }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-6 bg-gray-900 text-gray-100 p-6 rounded-xl shadow-md border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        <button
          onClick={copyToClipboard}
          className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-gray-950 p-4 rounded-lg text-sm overflow-x-auto border border-gray-800">
        <code className="font-mono">{data}</code>
      </pre>
    </div>
  );
}
