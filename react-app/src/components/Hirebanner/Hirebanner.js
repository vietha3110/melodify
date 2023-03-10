import Resume from "./Resume";
import { Modal } from "../Modal";
import { useState } from "react";

const HireMe = () => {
    const [showModal, setShowModal] = useState(false);
    const openResume = () => {
        setShowModal(true);
    }
    return (
        <div className="hireme">
            <div className="hireme-text">
                <div className="hireme-text-headline">
                    Let Ha help you hit all the right notes with her Full Stack Development skills
                </div>
                <div className="hireme-text-subhead">
                    With her Frontend and Backend proficiency, she'll make sure your platform is the 'Shape of You' in the digital world.
                </div>
            </div>
            <div className="hireme-btn">
                <button onClick={openResume}>
                    Hire Ha! 
                </button>
                {
                    showModal && (
                        <Modal>
                            <Resume onClose={() => setShowModal(false)}/>
                        </Modal>
                    )
                }
            </div>
        </div>
    )
}

export default HireMe;
