import { useState } from "react";

const routes = [
  {
    label: "Hashing",
    path: "/hash",
    children: [
      { label: "Text", path: "/hash/text" },
      { label: "File", path: "/hash/file" },
      { label: "Verify", path: "/hash/verify" },
      { label: "Multiple", path: "/hash/text/multiple" },
    ],
  },
  {
    label: "HMAC",
    path: "/hmac",
    children: [
      { label: "Generate", path: "/hmac/generate" },
      { label: "Verify", path: "/hmac/verify" },
    ],
  },
  {
    label: "AES",
    path: "/aes",
    children: [
      { label: "Encrypt / Decrypt", path: "/aes/encrypt-decrypt" },
      { label: "File Encrypt / Decrypt", path: "/aes/encrypt-file" }
    ],
  },
  { label: "RSA", path: "/rsa" },
  { label: "Encoding", path: "/other" },
  { label: "Identicon", path: "/identicon" },
];

export default function Sidebar({ currentPath }) {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState({});

  const toggleSection = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`bg-gray-900 text-gray-200 h-screen p-4 flex flex-col transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-6 text-gray-300 hover:text-white"
      >
        {/* {open ? "⟨--" : "--⟩"} */}
      </button>

      <nav className="flex flex-col gap-2">
        {routes.map((route) => (
          <div key={route.path}>
            {/* Main item */}
            <button
              onClick={() => route.children && toggleSection(route.label)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  currentPath.startsWith(route.path)
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <span>{open ? route.label : route.label[0]}</span>

              {open && route.children && (
                <span className="text-xs">
                  {expanded[route.label] ? "▾" : "▸"}
                </span>
              )}
            </button>

            {/* Subsections */}
            {route.children && expanded[route.label] && open && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                {route.children.map((child) => (
                  <a
                    key={child.path}
                    href={child.path}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      currentPath === child.path
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
