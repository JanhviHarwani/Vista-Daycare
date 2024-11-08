import ApplicationStructure from "../components/ApplicationStructure";
import './Eligibility.css'; // Importing an external CSS file for styles

function Eligibility() {
  return (
    <ApplicationStructure>
      <div className="eligibility-container">
        <h2 className="section-heading">Participant Eligibility in Vista Adult Day Care</h2>

        <h4 className="eligibility-description">
          <strong>Eligibility Criteria for ADHC:</strong> Community-based programs providing an organized day program of health, therapeutic, and social services. Programs serve frail older adults and younger adults with chronic disabling medical, cognitive, or mental health conditions who are at risk of institutional placement. Serves adults age 18 and over.
        </h4>


        <h3 className="section-heading">Payment Sources</h3>
        <div className="payment-sources-container">
          <ul className="payment-sources-list">
            <li className="payment-source-item">
              <h4 className="payment-source-heading">Medi-Cal</h4>
              <p className="payment-source-description">For participants who meet the Medi-Cal CBAS eligibility criteria.</p>
            </li>
            <li className="payment-source-item">
              <h4 className="payment-source-heading">Private Payment</h4>
              <p className="payment-source-description">Self-pay options available for participants not eligible for other funding sources.</p>
            </li>
            <li className="payment-source-item">
              <h4 className="payment-source-heading">Regional Center</h4>
              <p className="payment-source-description">For participants with Developmental Disabilities, funded through regional centers.</p>
            </li>
            <li className="payment-source-item">
              <h4 className="payment-source-heading">Area Agencies on Aging</h4>
              <p className="payment-source-description">Services funded through local aging agencies for qualified participants.</p>
            </li>
          </ul>
        </div>

        <div className="image-gallery">
          <div className="image-container">
            <img src="./img1.png" alt="Image 1" className="responsive-img" />
          </div>
          <div className="image-container">
            <img src="./img2.jpg" alt="Image 2" className="responsive-img" />
          </div>
          <div className="image-container">
            <img src="./img3.png" alt="Image 3" className="responsive-img" />
          </div>
          <div className="image-container">
            <img src="./img4.png" alt="Image 4" className="responsive-img" />
          </div>
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default Eligibility;
