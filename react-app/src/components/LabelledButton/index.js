import { useState } from 'react';
import './index.css';

const LabelledButton = ({ label = "Available soon", child }) => {
    const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

    const onMouseMove = (e) => {
        const x = (e.clientX + 20) + 'px';
        const y = (e.clientY + 20) + 'px';
        setPosition({ x, y });
    };

    return (
        <div className='labelled-button' onMouseMove={onMouseMove}>
            {child}
            <div className='labelled-button-label' style={{top: y, left: x}}>
                {label}
            </div>
        </div>
    );
};

export default LabelledButton;
