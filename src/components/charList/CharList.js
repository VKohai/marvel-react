import React, { Component } from 'react';

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
            deadend: false,
            selectedItem: null
        }
        this.refItems = [];
    }

    componentDidMount() {
        this.onRequest();
    }

    setRef = element => {
        this.refItems.push(element);
    }

    getCharacters = () =>
        this.marvelService
            .getCharacters(9)
            .then(this.onCharactersLoaded)
            .catch(this.props.onError);

    focusOnItem = (id) => {
        this.refItems.forEach(item => item.classList.remove('char__item_selected'));
        this.refItems[id].classList.add('char__item_selected');
        this.refItems[id].focus();
        this.setState(() => ({
            selectedItem: id
        }));
    }

    // #region Events
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

    onFocus = (id) => {
        const { selectedItem } = this.state;
        this.refItems.forEach((item, index) => {
            if (index === selectedItem) return;
            item.classList.remove('char__item_selected');
        });
        this.refItems[id].classList.add('char__item_selected');
    }

    onFocusLost = (id) => {
        const { selectedItem } = this.state;
        this.refItems.forEach((item, index) => {
            if (index === selectedItem) return;
            item.classList.remove('char__item_selected');
        });
    }

    // #endregion

    renderItems = (characters) => {
        // Generating li elements with character's data
        const items = characters.map((character, index) => {
            const isImgAvaliable = this.props.checkIfImageAvaliable(character.thumbnail);
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={character.id}
                    onClick={() => {
                        this.props.onCharacterSelected(character.id);
                        this.focusOnItem(index);
                    }}
                    ref={this.setRef}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharacterSelected(character.id);
                            this.focusOnItem(index);
                        }
                    }}
                    onFocus={() => this.onFocus(index)}
                    onBlur={() => this.onFocusLost(index)}>
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