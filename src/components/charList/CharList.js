import { Component } from 'react';

import Spinner from './../spinner/Spinner';
import ErrorMessage from './../errorMessage/ErrorMessage';
import MarvelService from './../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.marvelService = new MarvelService();
        this.state = {
            characters: [],
            loading: true,
            error: false,
            newItemLoading: false,
            offset: this.marvelService.base_offset,
            deadend: false
        }
    }

    componentDidMount() { this.onRequest() }

    getCharacters = () =>
        this.marvelService
            .getCharacters(9)
            .then(this.onCharactersLoaded)
            .catch(this.props.onError);

    onRequest = (offset) => {
        this.onCharactersLoading();
        this.marvelService
            .getCharacters(9, offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    onCharactersLoaded = (newCharacters) => {
        const { offset } = this.state;
        let areCharactersOver = false;
        if (this.marvelService.totalCharacters - 9 <= offset) {
            areCharactersOver = true;
        }
        this.setState(({ characters }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            deadend: areCharactersOver
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
        const { characters, error, loading, newItemLoading, offset, deadend } = this.state;

        const errMsg = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.renderItems(characters) : null;

        return (
            <div className="char__list">
                {errMsg}{spinner}{content}
                <button
                    className="button button__main button__long"
                    style={{ display: deadend ? 'none' : 'block' }}
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
export default CharList;