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
            error: false
        }
        this.marvelService = new MarvelService();
    }
    componentDidMount() { this.getCharacters(); }
    getCharacters = () =>
        this.marvelService
            .getCharacters(9)
            .then(this.onCharactersLoaded).catch(this.props.onError);

    onCharactersLoaded = (characters) =>
        this.setState({
            characters,
            loading: false
        });

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const { characters, error, loading } = this.state;
        const errMsg = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ?
            <View
                characters={characters}
                checkIfImageAvaliable={this.props.checkIfImageAvaliable}
            /> : null;
        return (
            <div className="char__list">
                {errMsg}{spinner}{content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

const View = ({ characters, checkIfImageAvaliable }) => {
    // Generating li elements with character's data
    const items = characters.map(character => {
        const isImgAvaliable = checkIfImageAvaliable(character.thumbnail);
        return (
            <li className="char__item" key={character.id}>
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
export default CharList;