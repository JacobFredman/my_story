import React, { useState } from 'react';
// import '../helpComponents/FontExample.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './modal.css';
// import '../myProgress/PerekTet/PerekTetCupsCol.css';
import './btn.css';



const Example2 = (props) => {

    return (
        <>

            <Modal
                open={props.open}
                onClose={() => props.setOpen(false)}
                center
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
            >
                <p className="modalHeader">
                    {props.header}
                </p>

                <p style={{ fontFamily: 'Assistant' }}>
                    {props.text}
                </p>
                {props.cencelBtn
                    ?
                    <div className="activeBtn  myBtn" onClick={() => props.setOpen(false)}>ביטול</div>
                    : ''
                }
                <div className="myBtn notActiveBtn" onClick={() => { props.onAccept(); props.setOpen(false); }}>{props.okBtnText}</div>
            </Modal>
        </>
    );
};



export default Example2;