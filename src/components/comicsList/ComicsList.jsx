import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ComicsList = (props) => {
    const [deadend, setDeadend] = useState(false);
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const { loading, error, totalComics, baseOffset, getComics } = useMarvelService();
    const [offset, setOffset] = useState(baseOffset);

    useEffect(() => {
        onRequest(baseOffset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        getComics(8, offset).then(onComicsLoaded);
    }

    function onComicsLoaded(newComics) {
        let areComicsOver = false;
        if (totalComics - 8 <= offset) {
            areComicsOver = true;
        }
        setComics([...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setDeadend(areComicsOver);
    }

    const renderItems = (comics) => {
        const items = comics.map((item, index) => {
            return (
                <li className="comics__item" key={index}>
                    <Link to={`/comics/${item.id}`} target='_blank' rel="noreferrer">
                        <img
                            className="comics__item-img"
                            src={item.thumbnail}
                            alt={item.title}
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price === 0 ? "Not avaliable" : `${item.price}$`}</div>
                    </Link>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }


    const errMsg = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const items = renderItems(comics);

    return (
        <div className="comics__list">
            {errMsg}{spinner}{items}
            <button
                className="button button__main button__long"
                style={{ display: deadend ? 'none' : 'block' }}
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default ComicsList;