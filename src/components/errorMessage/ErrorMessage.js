import gif from "./error.gif";
const ErrorMessage = () => {
    return (
        <img src={gif} alt="Error message"
            style={{ display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto" }} />
    );
}

export default ErrorMessage;