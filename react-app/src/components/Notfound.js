
const NotFound = () => {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"60px 30px 30px 30px"}}>
            <div>
                <h1>404. That's an error.</h1>
                <p style={{color: "rgba(0, 0, 0, 0.5)"}}>
                    Your requested URL was not found on this server. That's all we know.
                </p>
            </div>
        </div>
    )
}

export default NotFound;
