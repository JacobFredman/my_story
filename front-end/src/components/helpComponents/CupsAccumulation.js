import React from 'react';
import '../helpComponents/CupsAccumulation.css';
import '../../Photos/cup.png';

const CupsAccumulation = () => {
    return (
        <React.Fragment>
            {/* <div className="circleAroundCup" >111</div> */}
            <div style={{ height: '60px', width: '300px', textAlign: 'right', alignItems: 'right', direction: 'rtl', border: '1px solid', position: 'relative' }}>


                <div className="cupAccumBorder">
                    <h5 style={{ marginRight: "70px" }}>הגביעים שצברת:</h5>

                    <h6 style={{ color: '#707070', marginTop: '5px', marginRight: '10px' }}>130/</h6>
                    <h4 style={{ color: '#C68E30', marginRight: '3px' }}>20</h4>

                </div>
                <div className="circleAroundCup" style={{ backgroundImage: "require('../../Photos/cup.png')" }} ></div>
            </div>
        </React.Fragment>
    );
};


export default CupsAccumulation;