import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderColor           : '#78638f'
    }
};
function OptionsModal({modalIsOpen, closeModal}) {

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={"modal"}>
                    <div className={"full"}>
                        <span >Options (coming soon)</span>
                        <span style={{float:"right"}}onClick={() => closeModal()}>X</span>
                    </div>
                    <div>
                        Speed:
                        <button>slow</button>
                        <button>medium</button>
                        <button>fast</button>
                    </div>
                    <div>
                        Source:
                        <button>Fearless</button>
                        <button>Presidents</button>
                    </div>
                    <div>
                        Difficulty:
                        <button>Standard</button>
                        <button>Hard</button>
                        <button>Extra Hard</button>
                    </div>
                </div>

            </Modal>
        </div>
     )
}


export default OptionsModal
