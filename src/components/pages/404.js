import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <h2 style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '24px'
            }}>Page doesn't exist</h2>
            <Link style={{
                display: 'block',
                marginTop: '15px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '28px',
                color: '#9F0013'
            }} to="/">Back to main page</Link>
        </div >
    );
}

export default Page404;