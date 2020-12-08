import React from 'react';
import './RotatedPartName.css';

const RotatedPartName = (props) => {
    console.log(props.height);
    return (
        <div className="rPartName" style={{ background: props.background, height: props.height }}>
            {/* <p style={{ transform: 'rotate(-90deg)', paddingRight: '20px', position: 'absolute' }}>{props.partName}</p> */}
            <p className="pPartName">{'חלק ' + props.partNum}</p>
            {/* <p>חלק 1</p> */}
        </div>
    );
};

export default RotatedPartName;