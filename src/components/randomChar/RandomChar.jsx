import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setConent';
import checkIfImageAvaliable from './../../utils/checkIfImageAvaliable';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

function RandomChar(props) {
    const { getCharacterById, clearError, process, setProcess } = useMarvelService();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        updateCharacter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        clearError();
        getCharacterById(id)
            .then(onCharacterLoaded)
            .then(() => setProcess("confirmed"));
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    return (
        <div className="randomchar">
            {setContent(process, View, character)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
}

const View = ({ data }) => {
    if (!data)
        return null;

    const { name, thumbnail, homepage, wiki } = data;
    let { description } = data;
    if (typeof (description) === 'string') {
        description =
            description === '' ? 'No description' : description.slice(0, 175).trim() + "...";
    }
    const isImgAvaliable = checkIfImageAvaliable(thumbnail);

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={isImgAvaliable} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} target='_blank' rel='noreferrer' className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} target='_blank' rel='noreferrer' className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;