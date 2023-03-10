import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Resume = ({ onClose }) => {
    const closeResume = (e) => {
    e.stopPropagation();
    onClose();
}
   
    return (
        <div>
            <div onClick={closeResume} className="login-main-close">
                <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="resume-container">
                <div className="resume-headline">
                    <h1>Hey, It's Ha
                        <span className="resume-headline-icon">👋</span>
                    </h1>
                    <span style={{fontSize: "18px", fontStyle:"italic"}}>A small-town software engineer trying to make it big in the tech world.</span>
                </div>
                <div className="resume-main-content">
                    <p>
                    As a motivated software engineer based in the Greater Seattle Area, I have honed my technical abilities at App Academy's Full-time Software Engineering Program. With expertise in technologies such as JavaScript, Python, React, Redux, Node, Express, SQL, SQLAlchemy, Flask, and Postgres, I bring a strong foundation to any project. My diverse portfolio showcases my ability to tackle full-stack web applications, algorithms, and data structures. Additionally, my background in fintech, e-commerce, and e-logistics provides me with a well-rounded perspective and valuable business acumen. I invite you to explore my <a href="https://vietha3110.github.io/#projects">projects</a> and discover the full extent of my abilities.
                    </p>
                </div>
                <div className="resume-button">
                    <button className="resume-btn ha-resume">
                        <a href="https://drive.google.com/file/d/1jXf9cUKAinLdZH-RrtRQyBftGR0gruvo/view" target="_blank" style={{color: "black"}}>Resume</a>
                    </button>
                    <button  className="resume-btn ha-porfolio">
                        <a href="https://vietha3110.github.io/#projects" target="_blank" style={{color: "#fff"}}>Portfolio</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Resume;
