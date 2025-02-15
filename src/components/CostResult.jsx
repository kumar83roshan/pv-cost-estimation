import PropTypes from 'prop-types';

const CostResult = ({ result }) => {
  return (
    <div className="cost-result">
      <h2>Calculation Results</h2>
      <div className="result-grid">
        <div className="result-item">
          <span>Total Weight:</span>
          <span>{result.totalWeight} kg</span>
        </div>
        <div className="result-item">
          <span>User Added Weight:</span>
          <span>{result.userAddedWeight} kg</span>
        </div>
        <div className="result-item">
          <span>Adjusted Total Weight:</span>
          <span>{result.adjustedTotalWeight} kg</span>
        </div>
        <div className="result-item">
          <span>Raw Material Cost:</span>
          <span>INR {result.rawMaterialCost}</span>
        </div>
        <div className="result-item">
          <span>Fabrication Cost:</span>
          <span>INR {result.fabricationCost}</span>
        </div>
        <div className="result-item">
          <span>Welding Cost:</span>
          <span>INR {result.weldingCost}</span>
        </div>
        <div className="result-item">
          <span>PWHT Cost:</span>
          <span>INR {result.pwhtCost}</span>
        </div>
        <div className="result-item">
          <span>Painting Cost:</span>
          <span>INR {result.paintingCost}</span>
        </div>
        <div className="result-item">
          <span>Misc Cost:</span>
          <span>INR {result.miscCost}</span>
        </div>
        <div className="result-item">
          <span>Total RM Cost:</span>
          <span>INR {result.totalRMCost}</span>
        </div>
        <div className="result-item final-cost">
          <span>Quoted Cost:</span>
          <span>INR {result.finalCost}</span>
        </div>
      </div>
    </div>
  )
}

CostResult.propTypes = {
  result: PropTypes.shape({
    totalWeight: PropTypes.number.isRequired,
    userAddedWeight: PropTypes.number.isRequired,
    adjustedTotalWeight: PropTypes.number.isRequired,
    rawMaterialCost: PropTypes.number.isRequired,
    fabricationCost: PropTypes.number.isRequired,
    weldingCost: PropTypes.number.isRequired,
    pwhtCost: PropTypes.number.isRequired,
    paintingCost: PropTypes.number.isRequired,
    miscCost: PropTypes.number.isRequired,
    totalRMCost: PropTypes.number.isRequired,
    finalCost: PropTypes.number.isRequired,
  }).isRequired,
};

export default CostResult;
