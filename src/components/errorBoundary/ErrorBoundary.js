import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }
    componentDidCatch(err, info) {
        this.setState({ error: true })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }
        return this.props.children;
    };
}

export default ErrorBoundary;