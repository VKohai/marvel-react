import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import setContent from './../../utils/setConent';
import useMarvelService from "../../services/MarvelService";
import checkIfImageAvaliable from './../../utils/checkIfImageAvaliable';

import './charInfo.scss';


function CharInfo(props) {
    const [character, setCharacter] = useState(null);
    const {
        process,
        clearError, getCharacterById, setProcess
    } = useMarvelService();

    useEffect(() => {
        updateCharacter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.characterId]);

    function updateCharacter() {
        const { characterId } = props;
        if (!characterId)
            return;
        clearError();
        getCharacterById(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    }

    function onCharacterLoaded(character) {
        setCharacter(character);
    }

    return (
        <div className="char__info">
            {setContent(process, View, character)}
        </div>
    );
}

const View = ({ data }) => {
    const imgStyle = checkIfImageAvaliable(data.thumbnail);
    const comics = [];
    for (let i = 0; i < 10; ++i) {
        if (data.comics[i] === undefined)
            break;
        const comicId = data.comics[i].resourceURI.match(/\d+$/)[0];
        comics[i] = (
            <li className="char__comics-item" key={comicId}>
                <Link to={`/comics/${comicId}`} target="_blank" rel="noopener noreferrer">{data.comics[i].name}</Link>
            </li>
        );
    }
    return (
        <>
            <div className="char__basics">
                <img src={data.thumbnail} alt={data.name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{data.name}</div>
                    <div className="char__btns">
                        <a href={data.homepage} target='_blank' rel='noreferrer' className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={data.wiki} target='_blank' rel='noreferrer' className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {data.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length <= 0 ? "There's no comics" : comics}
            </ul>
        </>
    );
}

export default CharInfo;