import { useState } from "react";
import CostInputForm from "../components/CostInputForm";
import CostResult from "../components/CostResult";

export default function Home() {
  const [result, setResult] = useState(null);

  const calculateCost = (inputs) => {
    // Convert mm to meters and ensure numerical values
    const diameter = parseFloat(inputs.diameter) / 1000 || 0;
    const thickness = parseFloat(inputs.thickness) / 1000 || 0;
    const length = parseFloat(inputs.length) / 1000 || 0;
    const dishRadius = diameter / 2;

    // Ensure all inputs are converted to numbers
    const materialRate = parseFloat(inputs.materialRate) || 0;
    const fabricationRate = parseFloat(inputs.fabricationRate) || 0;
    const miscCost = parseFloat(inputs.miscCost) || 0;
    const profitMargin = parseFloat(inputs.profitMargin) || 0;
    const userAddedWeight = parseFloat(inputs.extraWeight) || 0;

    // Density based on material type
    const materialDensities = {
      CS: 7850,
      SS: 8000,
      DSS: 8000,
      Monel: 8140,
      Inconel: 8500
    };
    const density = materialDensities[inputs.materialType] || 7850; // Default CS if invalid

    // Welding Rates based on Material Type
    const weldingRates = {
      CS: 250,
      SS: 550,
      DSS: 1400,
      Monel: 3200,
      Inconel: 2500
    };

    // Calculate Other Weights
    const shellWeight = Math.PI * diameter * thickness * length * density;
    const dishWeight = 2 * 0.9 * Math.PI * Math.pow(dishRadius, 2) * thickness * density;
    const supportWeight = shellWeight * 0.05;
    const nozzleWeight = shellWeight * 0.1;
    const attachmentWeight = shellWeight * 0.025;
    let totalWeight = shellWeight + dishWeight + supportWeight + nozzleWeight + attachmentWeight;

    // Final Adjusted Total Weight
    const adjustedTotalWeight = totalWeight + userAddedWeight;

    // Cost Calculations based on Adjusted Total Weight
    const rawMaterialCost = adjustedTotalWeight * materialRate;
    const fabricationCost = adjustedTotalWeight * fabricationRate;
    const weldingCost = adjustedTotalWeight * 0.15 * weldingRates[inputs.materialType]; 
    const pwhtCost = adjustedTotalWeight * 7.5;

    // Surface Area Calculations
    const shellSurfaceArea = Math.PI * diameter * length;
    const dishEndSurfaceArea = 2 * 1.1 * Math.PI * Math.pow(diameter / 2, 2);
    const surfaceArea = (shellSurfaceArea + dishEndSurfaceArea) * 1.3;
    const paintingCost = surfaceArea * 2500;

    // Total Cost Calculation
    const totalRMCost = rawMaterialCost + fabricationCost + weldingCost + pwhtCost + paintingCost + miscCost;
    const finalCost = totalRMCost * (1 + profitMargin / 100); 

    setResult({
      totalWeight: totalWeight.toFixed(2),
      userAddedWeight: userAddedWeight.toFixed(2),
      adjustedTotalWeight: adjustedTotalWeight.toFixed(2),
      rawMaterialCost: rawMaterialCost.toFixed(2),
      fabricationCost: fabricationCost.toFixed(2),
      weldingCost: weldingCost.toFixed(2),
      pwhtCost: pwhtCost.toFixed(2),
      paintingCost: paintingCost.toFixed(2),
      miscCost: miscCost.toFixed(2),
      totalRMCost: totalRMCost.toFixed(2),
      finalCost: finalCost.toFixed(2),
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <CostInputForm onCalculate={calculateCost} />
      {result && <CostResult result={result} />}
    </div>
  );
}
