import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, clearError, getComicsById, getCharacterById } = useMarvelService();

    useEffect(() => updateData(), [id]);

    const updateData = () => {
        clearError();
        switch (dataType) {
            case "comics":
                getComicsById(id).then(onDataLoaded)
                break;
            case "character":
                getCharacterById(id).then(onDataLoaded)
                break;
            default:
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

export default SinglePage;