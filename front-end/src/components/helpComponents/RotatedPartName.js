import React from 'react';
import './RotatedPartName.css';

const RotatedPartName = (props) => {
    console.log(props.height);
    return (
        <div className="rPartName" style={{ background: props.background, height: props.height }}>
            <p className="pPartName">{'חלק ' + props.partNum}</p>
        </div>
    );
};

export default RotatedPartName;