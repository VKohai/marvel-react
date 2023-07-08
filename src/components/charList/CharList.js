import { useState, useEffect, useRef } from 'react';

import Spinner from './../spinner/Spinner';
import ErrorMessage from './../errorMessage/ErrorMessage';
import useMarvelService from './../../services/MarvelService';

import './charList.scss';

function CharList(props) {
    const refItems = useRef([]);
    const [deadend, setDeadend] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const { loading, error, totalCharacters, baseOffset, getCharacters } = useMarvelService();
    const [offset, setOffset] = useState(baseOffset);


    // eslint-disable-next-line
    useEffect(() => { onRequest(baseOffset, true); }, []);

    function focusOnItem(id) {
        refItems.current.forEach(item => item.classList.remove('char__item_selected'));
        refItems.current[id].classList.add('char__item_selected');
        refItems.current[id].focus();
        setSelectedItem(id);
    }

    // #region Events
    function onRequest(offset, initial) {
        setNewItemLoading(!initial);
        getCharacters(9, offset).then(onCharactersLoaded);
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
            const isImgAvaliable = props.checkIfImageAvaliable(character.thumbnail);
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

    const errMsg = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const items = renderItems(characters);

    return (
        <div className="char__list">
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
export default CharList;