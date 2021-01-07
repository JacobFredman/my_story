import React from 'react';
import logoNaama from '../../Photos/logoNaamaMdr.png'; // with import
import logoJacob from '../../Photos/logoJacobFredman.png';


const Credit = () => {
    return (
        // <div style={{ width: '300px', height: '70px', margin: '0' }}>
        <div>
            <div style={{ display: 'inline-block', margin: '10px' }} >
                <a href="https://asimetrit.com/" target='_blank'>
                    <img style={{ display: 'inline-block' }} src={logoNaama} width="70" height="40"></img>
                </a>
                <p style={{ display: 'inline-block', color: '#991D58', fontSize: '12px' }}>:עיצוב</p>
            </div>
            <div style={{ display: 'inline-block', margin: '10px' }} >
                <a >
                    <img style={{ display: 'inline-block' }} src={logoJacob} width="70" height="14"></img>
                </a>
                <p style={{ display: 'inline-block', color: 'blue', fontSize: '12px', marginLeft: '8px' }}>:פיתוח</p>
            </div>
        </div>
    );
};
export default Credit;                            
