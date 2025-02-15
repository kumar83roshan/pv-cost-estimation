"use client"

import { useState } from "react"
import CostInputForm from "../components/CostInputForm"
import CostResult from "../components/CostResult"
import "../App.css"

export default function App() {
  const [result, setResult] = useState(null)

  const calculateCost = (inputs) => {
    // Convert mm to meters and ensure numerical values
    const diameter = Number.parseFloat(inputs.diameter) / 1000 || 0
    const thickness = Number.parseFloat(inputs.thickness) / 1000 || 0
    const length = Number.parseFloat(inputs.length) / 1000 || 0
    const dishRadius = diameter / 2

    // Ensure all inputs are converted to numbers
    const materialRate = Number.parseFloat(inputs.materialRate) || 0
    const fabricationRate = Number.parseFloat(inputs.fabricationRate) || 0
    const miscCost = Number.parseFloat(inputs.miscCost) || 0
    const wastageCost = Number.parseFloat(inputs.wastageCost) || 0 // New Wastage Cost
    const profitMargin = Number.parseFloat(inputs.profitMargin) || 0
    const userAddedWeight = Number.parseFloat(inputs.extraWeight) || 0
    const internalCost = Number.parseFloat(inputs.internalCost) || 0 // Internal Cost

    // Density based on material type
    const materialDensities = {
      CS: 7850,
      SS: 8000,
      DSS: 8000,
      Monel: 8140,
      Inconel: 8500,
    }
    const density = materialDensities[inputs.materialType] || 7850 // Default CS if invalid

    // Welding Rates based on Material Type
    const weldingRates = {
      CS: 250,
      SS: 550,
      DSS: 1400,
      Monel: 3200,
      Inconel: 2500,
    }

    // Calculate Other Weights
    const shellWeight = Math.PI * diameter * thickness * length * density
    const dishWeight = 2 * 0.9 * Math.PI * Math.pow(dishRadius, 2) * thickness * density
    const supportWeight = shellWeight * 0.05
    const attachmentWeight = shellWeight * 0.025
    let skirtWeight = 0
    let legSupportWeight = 0
    let nozzleWeight = 0

    if (inputs.attachmentType === "Skirt") {
      skirtWeight = shellWeight * 0.2 // Skirt weight is 20% of shell weight
    } else if (inputs.attachmentType === "Leg Support") {
      legSupportWeight = shellWeight * 0.1 // Leg Support weight is 10% of shell weight
    }

    // Nozzle Type Consideration
    if (inputs.nozzleType === "SRN") {
      nozzleWeight = shellWeight * 0.25 // SRN nozzle weight is 25% of shell weight
    } else if (inputs.nozzleType === "Plate/Pipe") {
      nozzleWeight = shellWeight * 0.15 // Plate/Pipe nozzle weight is 15% of shell weight
    }

    const totalWeight = shellWeight + dishWeight + supportWeight + nozzleWeight + attachmentWeight + skirtWeight + legSupportWeight

    // Final Adjusted Total Weight
    const adjustedTotalWeight = totalWeight + userAddedWeight

    // Cost Calculations based on Adjusted Total Weight
    const rawMaterialCost = adjustedTotalWeight * materialRate
    const fabricationCost = adjustedTotalWeight * fabricationRate
    const weldingCost = adjustedTotalWeight * 0.15 * weldingRates[inputs.materialType]
    const pwhtCost = adjustedTotalWeight * 7.5

    // Surface Area Calculations
    const shellSurfaceArea = Math.PI * diameter * length
    const dishEndSurfaceArea = 2 * 1.1 * Math.PI * Math.pow(diameter / 2, 2)
    const surfaceArea = (shellSurfaceArea + dishEndSurfaceArea) * 1.3
    const paintingCost = surfaceArea * 2500

    // Total Cost Calculation
    const totalRMCost = rawMaterialCost + fabricationCost + weldingCost + pwhtCost + paintingCost + miscCost + wastageCost + internalCost
    const finalCost = totalRMCost * (1 + profitMargin / 100)

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
      wastageCost: wastageCost.toFixed(2), // Display Wastage Cost
      internalCost: internalCost.toFixed(2),
      totalRMCost: totalRMCost.toFixed(2),
      finalCost: finalCost.toFixed(2),
    })
  }

  return (
    <div className="app">
      <h1> Budgetary Pressure Vessel Cost Calculator </h1>
      <CostInputForm onCalculate={calculateCost} />
      {result && <CostResult result={result} />}
    </div>
  )
}
