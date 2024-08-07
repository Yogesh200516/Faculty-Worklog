import React from "react";
import frsTotalImage from '../../../assets/images/frs_gained.png';
import frsLostImage from '../../../assets/images/frs_lost.png';
import './FRSTotal.css';

function FRSTotal() {
    return(
        <div className="frs-body">
            <div className='head-text4'>Overall FRS Summary</div>
          <div className='left-content'>
            <div className='positive-update'>
            <div className="summary4">
                <img className="summary-image2" src={frsTotalImage} alt="FRS Total Image" />
                <div className="summary-text2">
                    <span className="summary-title2">FRS Provided</span>
                    <span className="summary-value2" style={{color: '#4caf50'}}>4000</span>
                </div>
            </div>
            </div>
            <div className='negative-update'>
            <div className="summary5">
                <img className="summary-image2" src={frsLostImage} alt="FRS Lossed Image" />
                <div className="summary-text2">
                    <span className="summary-title2">FRS Taken</span>
                    <span className="summary-value2" style={{color: '#e64a19'}}>600</span>
                </div>
            </div>
            </div>
          </div>
        </div>
    )
}

export default FRSTotal;
