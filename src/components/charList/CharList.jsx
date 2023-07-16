import { useState, useEffect, useRef } from 'react';

import useMarvelService from '../../services/MarvelService';

import Spinner from './../spinner/Spinner';
import ErrorMessage from './../errorMessage/ErrorMessage';

import checkIfImageAvaliable from './../../utils/checkIfImageAvaliable';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemLoading ? <Component /> : <Spinner />;
        case "confirmed":
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error("Unexcepted process state");
    }
}

function CharList(props) {
    const refItems = useRef([]);
    const [deadend, setDeadend] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const { process, setProcess,
        totalCharacters, baseOffset, getCharacters } = useMarvelService();
    const [offset, setOffset] = useState(baseOffset);

    useEffect(() => {
        onRequest(baseOffset, true);
        // eslint-disable-next-line
    }, []);

    function focusOnItem(id) {
        refItems.current.forEach(item => item.classList.remove('char__item_selected'));
        refItems.current[id].classList.add('char__item_selected');
        refItems.current[id].focus();
        setSelectedItem(id);
    }

    // #region Events
    function onRequest(offset, initial) {
        setNewItemLoading(!initial);
        getCharacters(9, offset)
            .then(onCharactersLoaded)
            .then(() => setProcess("confirmed"));
    }

    function onCharactersLoaded(newCharacters) {
        let areCharactersOver = false;
        if (totalCharacters - 9 <= offset) {
            areCharactersOver = true;
        }
        setCharacters([...characters, ...newCharacters]);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setDeadend(areCharactersOver);
    }

    function onFocus(id) {
        refItems.current.forEach((item, index) => {
            if (index === selectedItem) return;
            item.classList.remove('char__item_selected');
        });
        refItems.current[id].classList.add('char__item_selected');
    }

    function onFocusLost(id) {
        refItems.current.forEach((item, index) => {
            if (index === selectedItem) return;
            item.classList.remove('char__item_selected');
        });
    }
    // #endregion

    function renderItems(characters) {
        // Generating li elements with character's data
        const items = characters.map((character, index) => {
            const isImgAvaliable = checkIfImageAvaliable(character.thumbnail);
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={character.id}
                    onClick={() => {
                        props.onCharacterSelected(character.id);
                        focusOnItem(index);
                    }}
                    ref={el => refItems.current[index] = el}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharacterSelected(character.id);
                            focusOnItem(index);
                        }
                    }}
                    onFocus={() => onFocus(index)}
                    onBlur={() => onFocusLost(index)}>
                    <img src={character.thumbnail} alt={character.name} style={isImgAvaliable} />
                    <div className="char__name">{character.name}</div>
                </li>
            );
        });
        // Align the spinner/error to the center
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    return (
        <div className="char__list">
            {setContent(process, () => renderItems(characters), newItemLoading)}
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
export default CharList;