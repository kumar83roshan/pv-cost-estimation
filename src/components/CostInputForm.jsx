"use client"

import { useState } from "react"

const CostInputForm = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    
    thickness: "",
    diameter: "",
    length: "",
    materialType: "CS",
    materialRate: "",
    fabricationRate: "",
    miscCost: "",
    miscCostDetails: "", // New Misc. Cost Details Field
    wastageCost: "", // New Wastage Cost Field
    profitMargin: "",
    extraWeight: "",
    internalCost: "", // Internal Cost Field
    attachmentType: "None", // Attachment Type Field
    nozzleType: "SRN", // New Nozzle Type Field
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(inputs)
  }

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input-group">
      <label>
          Vessel Thickness (mm):
          <input type="number" name="thickness" value={inputs.thickness} onChange={handleChange} required />
        </label>
        <label>
          Vessel Inside Diameter (mm):
          <input type="number" name="diameter" value={inputs.diameter} onChange={handleChange} required />
        </label>
      </div>
      <div className="input-group">
        <label>
          Vessel Length (mm):
          <input type="number" name="length" value={inputs.length} onChange={handleChange} required />
        </label>
        
      <label>
          Nozzle Type:
          <select name="nozzleType" value={inputs.nozzleType} onChange={handleChange}>
            <option value="SRN">SRN</option>
            <option value="Plate/Pipe">Plate/Pipe</option>
          </select>
        </label>
        </div>
        <div className="input-group">
        <label>
          Attachment Type:
          <select name="attachmentType" value={inputs.attachmentType} onChange={handleChange}>
            <option value="None">None</option>
            <option value="Skirt">Skirt</option>
            <option value="Leg Support">Leg Support</option>
          </select>
        </label>
        <label>
          Material of Construction:
          <select name="materialType" value={inputs.materialType} onChange={handleChange}>
            <option value="CS">CS</option>
            <option value="SS">SS</option>
            <option value="DSS">DSS</option>
            <option value="Monel">Monel</option>
            <option value="Inconel">Inconel</option>
          </select>
        </label>
      </div>
      <div className="input-group">
        <label>
          Raw Material Rate:
          <input type="number" name="materialRate" value={inputs.materialRate} onChange={handleChange} required />
        </label>
        <label>
          Fabrication Rate:
          <input type="number" name="fabricationRate" value={inputs.fabricationRate} onChange={handleChange} required />
        </label>
      </div>
      <div className="input-group">
        <label>
          Misc. Cost Details (Like FEA, N2 Purging Cost, etc.):
          <input type="text" name="miscCostDetails" value={inputs.miscCostDetails} onChange={handleChange} placeholder="Enter details" />
        </label>
        <label>
          Wastage Cost:
          <input type="number" name="wastageCost" value={inputs.wastageCost} onChange={handleChange} required />
        </label>
      </div>
      <div className="input-group">
        <label>
          Extra Weight:
          <input type="number" name="extraWeight" value={inputs.extraWeight} onChange={handleChange} required />
        </label>
        <label>
          Internal Cost (If Any):
          <input type="number" name="internalCost" value={inputs.internalCost} onChange={handleChange} />
        </label>
      </div>
      <div className="input-group">
        <label>
          Profit Margin (%):
          <input type="number" name="profitMargin" value={inputs.profitMargin} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Calculate</button>
    </form>
  )
}

export default CostInputForm
