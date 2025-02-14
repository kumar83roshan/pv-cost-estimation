"use client"

import { useState } from "react"

const CostInputForm = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    diameter: "",
    thickness: "",
    length: "",
    materialType: "CS",
    materialRate: "",
    fabricationRate: "",
    miscCost: "",
    profitMargin: "",
    extraWeight: "",
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
          Vessel Inside Diameter (mm):
          <input type="number" name="diameter" value={inputs.diameter} onChange={handleChange} required />
        </label>
        <label>
           Vessel Thickness (mm):
          <input type="number" name="thickness" value={inputs.thickness} onChange={handleChange} required />
        </label>
      </div>
      <div className="input-group">
        <label>
          Vessel Length (mm):
          <input type="number" name="length" value={inputs.length} onChange={handleChange} required />
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
          Material Rate:
          <input type="number" name="materialRate" value={inputs.materialRate} onChange={handleChange} required />
        </label>
        <label>
          Fabrication Rate:
          <input type="number" name="fabricationRate" value={inputs.fabricationRate} onChange={handleChange} required />
        </label>
      </div>
      <div className="input-group">
        <label>
          Misc Cost:
          <input type="number" name="miscCost" value={inputs.miscCost} onChange={handleChange} required />
        </label>
        <label>
          Profit Margin (%):
          <input type="number" name="profitMargin" value={inputs.profitMargin} onChange={handleChange} required />
        </label>
      </div>
      <div className="input-group">
        <label>
          Extra Weight:
          <input type="number" name="extraWeight" value={inputs.extraWeight} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Calculate</button>
    </form>
  )
}

export default CostInputForm

