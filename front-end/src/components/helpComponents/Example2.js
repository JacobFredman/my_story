import React, { useState } from 'react';
// import '../helpComponents/FontExample.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './modal.css';
// import '../myProgress/PerekTet/PerekTetCupsCol.css';
import './btn.css';



const Example2 = (props) => {

    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <button className="button" onClick={() => setOpen(true)}>
                Open modal
              </button> */}

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
                    {/* ?האם לאפס את המסע שלך */}
                    {props.header}
                </p>

                <p style={{ fontFamily: 'Assistant' }}>
                    {/* המסע ימחק ולא יהיה ניתן לשחזר אותו */}
                    {props.text}
                </p>
                {/* <div onClick={() => updategoalsOrHobits(true)} className={goalsSelected ? "goalsOrHobitsBtn activeBtn" : "notActiveBtn goalsOrHobitsBtn"}>יעדים</div> */}
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