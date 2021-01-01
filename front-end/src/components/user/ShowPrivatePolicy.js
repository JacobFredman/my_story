import React from 'react';
import PrivatePolicy from './PrivatePolicy';
import 'react-responsive-modal/styles.css';
import '../helpComponents/modal.css';
import { Modal } from 'react-responsive-modal';


const ShowPrivatePolicy = (props) => {
    return (
        <div>

            <Modal
                open={props.open}
                onClose={() => console.log('object')}
                // onClose={() => props.setModalOpen(false)}
                center
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
                showCloseIcon={false}
            >
                <PrivatePolicy />
                {/* <div onClick={() => updategoalsOrHobits(true)} className={goalsSelected ? "goalsOrHobitsBtn activeBtn" : "notActiveBtn goalsOrHobitsBtn"}>יעדים</div> */}
                <div onClick={props.onAceptPrivacyPolicy} className="activeBtn  myBtn">אישור</div>
                {/* <div className="myBtn notActiveBtn">אני רוצה לאפס את המסע</div> */}
            </Modal>
        </div>
    );
};

export default ShowPrivatePolicy;