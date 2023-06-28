import { Component } from 'react';
import Spinner from './../spinner/Spinner';
import ErrorMessage from './../errorMessage/ErrorMessage';
import MarvelService from './../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {},
            loading: true,
            error: false
        };
        this.marvelService = new MarvelService();
    }

    // #region methods
    componentDidMount() {
        this.getRandomCharacter();
    }

    getRandomCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacterById(id)
            .then(this.onCharacterLoaded)
            .catch(this.props.onError);
    }
    // #endregion 

    // #region events
    onCharacterLoaded = (character) => {
        this.setState({ character, loading: false });
    }
    // #endregion 

    render() {
        const { character, loading, error } = this.state;
        const errMsg = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        this.props.checkIfImageAvaliable(character.thumbnail);
        const content = !(loading || error) ?
            <View
                character={character}
                checkIfImageAvaliable={this.props.checkIfImageAvaliable}
            /> : null;

        return (
            <div className="randomchar">
                {errMsg}{spinner}{content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                        onClick={this.getRandomCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        );
    }
}

const View = ({ character, checkIfImageAvaliable }) => {
    const { name, thumbnail, homepage, wiki } = character;
    let { description } = character;
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
    )
}

export default RandomChar;