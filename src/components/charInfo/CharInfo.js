import { useState, useEffect } from "react";

import Spinner from './../spinner/Spinner';
import Skeleton from './../skeleton/Skeleton';
import ErrorMessage from './../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";

import './charInfo.scss';


function CharInfo(props) {
    const [character, setCharacter] = useState(null);
    const { loading, error, clearError, getCharacterById } = useMarvelService();

    useEffect(() => {
        updateCharacter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.characterId]);

    function updateCharacter() {
        const { characterId } = props;
        if (!characterId)
            return;
        clearError();
        getCharacterById(characterId).then(onCharacterLoaded);
    }

    function onCharacterLoaded(character) {
        setCharacter(character)
    }

    const skeleton = character || loading || error ? null : <Skeleton />;
    const errMsg = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !character) ?
        <View
            character={character}
            checkIfImageAvaliable={props.checkIfImageAvaliable}
        /> : null;

    return (
        <div className="char__info">
            {skeleton}{errMsg}{spinner}{content}
        </div>
    );
}

const View = ({ character, checkIfImageAvaliable }) => {
    const imgStyle = checkIfImageAvaliable(character.thumbnail);
    const comics = [];
    for (let i = 0; i < 10; ++i) {
        if (character.comics[i] === undefined)
            break;

        comics[i] = (
            <li className="char__comics-item" key={i}>
                <a href={character.comics[i].resourceURI} target="_blank" rel="noopener noreferrer">{character.comics[i].name}</a>
            </li>
        );
    }
    return (
        <>
            <div className="char__basics">
                <img src={character.thumbnail} alt={character.name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{character.name}</div>
                    <div className="char__btns">
                        <a href={character.homepage} target='_blank' rel='noreferrer' className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={character.wiki} target='_blank' rel='noreferrer' className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {character.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length <= 0 ? "There's no comics" : comics}
            </ul>
        </>
    );
}

export default CharInfo;