export default function FormGroups({
  label,
  id,
  type,
  name,
  placeholder,
  formData,
  handleInputChange,
  options = [],
}) {
  return (
    <>
      {type === "select" ? (
        <div className="space-y-2">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>

          <select
            id={id}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className="
              w-full p-3 
            bg-gray-50 border 
            border-gray-300 
              rounded-lg 
            text-gray-700 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-blue-500"
          >
            <option disabled value="">
              -- Select an option --
            </option>

            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="space-y-2">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>

          {type === "input" ? (
            <input
              type="text"
              id={id}
              name={name}
              className="
                w-full 
                p-3 
                rounded-lg border 
                border-gray-300 
                focus:ring-2 
                focus:ring-blue-500 
                focus:border-blue-500 
                bg-gray-50 
                text-gray-800"
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleInputChange}
              required
            />
          ) : (
            <textarea
              id={id}
              name={name}
              rows="4"
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleInputChange}
              className="
                w-full 
                p-3 
                rounded-lg 
                border 
                border-gray-300 
                focus:ring-2 
                focus:ring-blue-500 
                focus:border-blue-500 
                bg-gray-50 
                text-gray-800"
            />
          )}
        </div>
      )}
    </>
  );
}
