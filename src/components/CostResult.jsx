export default function CostResult({ result }) {
  if (!result) {
    return <div className="text-red-500">No result available. Please enter data.</div>;
  }

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded shadow-md">
      <h3 className="text-lg font-semibold">Results</h3>
      <ul className="mt-2">
        {Object.entries(result).map(([key, value]) => (
          <li key={key} className="text-sm">
            <strong>
              {key === "totalRMCost" ? "Total RM Cost:" : 
               key === "finalCost" ? "Final Cost with Profit Margin:" : 
               key.replace(/([A-Z])/g, " $1")}:
            </strong> 
            ₹{!isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
