import { Component } from 'react';
import './charList.scss';
import Spinner from './../spinner/Spinner';
import MarvelService from './../../services/MarvelService';
import ErrorMessage from './../errorMessage/ErrorMessage';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            loading: true,
            error: false,
            newItemLoading: false,
            offset: 210
        }
        this.marvelService = new MarvelService();
    }

    componentDidMount() { this.onRequest() }

    getCharacters = () =>
        this.marvelService
            .getCharacters(9)
            .then(this.onCharactersLoaded).catch(this.props.onError);

    onRequest = (offset) => {
        this.marvelService
            .getCharacters(9, offset)
            .then(this.onCharactersLoaded)
            .catch(this.props.onError);
    }

    onCharactersLoaded = (newCharacters) => {
        debugger;
        this.setState(({ offset, characters }) => ({
            characters: [...characters, newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }));
    }

    onCharactersLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    renderItems = (characters) => {
        // Generating li elements with character's data
        const items = characters.map(character => {
            const isImgAvaliable = this.props.checkIfImageAvaliable(character.thumbnail);
            return (
                <li
                    className="char__item"
                    key={character.id}
                    onClick={() => this.props.onCharacterSelected(character.id)}>
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

    render() {
        const { characters, error, loading, newItemLoading, offset } = this.state;

        const errMsg = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.renderItems(characters) : null;

        return (
            <div className="char__list">
                {errMsg}{spinner}{content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
export default CharList;