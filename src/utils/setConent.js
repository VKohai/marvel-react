import Spinner from './../components/spinner/Spinner';
import Skeleton from './../components/skeleton/Skeleton';
import ErrorMessage from './../components/errorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
    if (!data)
        return;

    switch (process) {
        case "waiting":
            return <Skeleton />;
        case "loading":
            return <Spinner />;
        case "confirmed":
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error("Unexcepted process state");
    }
}

export default setContent;