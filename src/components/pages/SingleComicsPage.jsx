
import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";

const SingleComicsPage = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComicsById, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function updateComic() {
        clearError();
        getComicsById(id).then(onComicLoaded);
    }

    function onComicLoaded(comic) {
        setComic(comic);
    }

    const errMsg = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {errMsg}{spinner}{content}
        </>
    );
}

const View = ({ comic }) => {
    const { title, description, price, language, thumbnail, pageCount } = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description ? description : 'No description'}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price === 0 ? "Not avaliable" : `${price}$`}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicsPage;