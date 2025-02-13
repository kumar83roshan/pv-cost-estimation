import { useState } from "react";

export default function CostInputForm({ onCalculate }) {
  const [inputs, setInputs] = useState({
    diameter: "",  // No default value
    length: "",    
    thickness: "",
    materialRate: "",
    fabricationRate: "",
    miscCost: "",
    profitMargin: "", // Explicitly in percentage (%)
    extraWeight: "",  // User-added weight
    materialType: "CS", // Default material
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert all numerical inputs to float, keep dropdown values as strings
    const newValue = name === "materialType" ? value : parseFloat(value) || 0;

    setInputs({ ...inputs, [name]: newValue });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold mb-4">Pressure Vessel Cost Estimation</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(inputs).map((key) => (
          key !== "materialType" ? (
            <div key={key}>
              <label className="block text-sm font-medium">
                {key.replace(/([A-Z])/g, ' $1')} {key === "diameter" || key === "thickness" || key === "length" ? "(mm)" : key === "profitMargin" ? "(%)" : ""}
              </label>
              <input
                type="number"
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                required
              />
            </div>
          ) : (
            <div key={key}>
              <label className="block text-sm font-medium">Material Type</label>
              <select
                name="materialType"
                value={inputs.materialType}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="CS">Carbon Steel (CS)</option>
                <option value="SS">Stainless Steel (SS)</option>
                <option value="DSS">Duplex Stainless Steel (DSS)</option>
                <option value="Monel">Monel</option>
                <option value="Inconel">Inconel</option>
              </select>
            </div>
          )
        ))}
      </div>
      <button
        onClick={() => onCalculate(inputs)}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >
        Calculate
      </button>
    </div>
  );
}
