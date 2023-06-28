import { Component } from "react";

import Spinner from './../spinner/Spinner';
import Skeleton from './../skeleton/Skeleton';
import ErrorMessage from './../errorMessage/ErrorMessage';
import MarvelService from "../../services/MarvelService";

import './charInfo.scss';


class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.marvelService = new MarvelService();
        this.state = {
            character: null,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacter();
        }
    }

    updateCharacter = () => {
        const { characterId } = this.props;
        if (!characterId)
            return;

        this.onCharacterLoading();
        this.marvelService
            .getCharacterById(characterId)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    onCharacterLoaded = (character) => {
        this.setState({ character, loading: false });
    }

    onCharacterLoading = () => {
        this.setState({ loading: true });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const { character, loading, error } = this.state;

        const skeleton = character || loading || error ? null : <Skeleton />;
        const errMsg = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !character) ?
            <View
                character={character}
                checkIfImageAvaliable={this.props.checkIfImageAvaliable}
            /> : null;
        return (
            <div className="char__info">
                {skeleton}{errMsg}{spinner}{content}
            </div>
        );
    }
}

const View = ({ character, checkIfImageAvaliable }) => {
    const imgStyle = checkIfImageAvaliable(character.thumbnail);
    const comics = character.comics.map((item, index) => {
        return (
            <li className="char__comics-item" key={index}>
                <a href={item.resourceURI} target="_blank" rel="noopener noreferrer">{item.name}</a>
            </li>);
    });
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
                {comics}
            </ul>
        </>
    );
}

export default CharInfo;