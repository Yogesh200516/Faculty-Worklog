import React from "react";
import './Record.css';
import updateIcon from '../../../assets/images/frs_total.png';
import positiveIcon from '../../../assets/images/increase.png';
import negativeIcon from '../../../assets/images/decrease.png';

function Record() {
    return (
        <div className="record-body">
            <div className="head-text1">Update Records</div>
            <div className="right-content">
                <div className="update-details">
                    <div className="update-item">
                        <img className="update-icon" src={updateIcon} alt="Update Icon" />
                        <div className="update-text">
                            <div className="update-title">No. of Updates</div>
                            <div className="update-value">10</div>
                        </div>
                    </div>
                    <div className="update-item">
                        <img className="update-icon" src={positiveIcon} alt="Positive Icon" />
                        <div className="update-text">
                            <div className="update-title">Positive Updates</div>
                            <div className="update-value positive">8</div>
                        </div>
                    </div>
                    <div className="update-item">
                        <img className="update-icon" src={negativeIcon} alt="Negative Icon" />
                        <div className="update-text">
                            <div className="update-title">Negative Updates</div>
                            <div className="update-value negative">2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Record;
