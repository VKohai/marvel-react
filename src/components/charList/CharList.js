import { Component } from 'react';
import './charList.scss';
import MarvelService from './../../services/MarvelService';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: []
        }
        this.marvelService = new MarvelService();
    }
    componentDidMount() { this.getCharacters(); }
    getCharacters = () => this.marvelService.getCharacters().then(this.onCharactersLoaded);

    onCharactersLoaded = (characters) => this.setState({ characters })

    render() {
        const { characters } = this.state;
        const items = characters.map(character => (
            <li className="char__item" key={character.id}>
                <img src={character.thumbnail} alt={character.name} />
                <div className="char__name">{character.name}</div>
            </li>
        ));
        debugger;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {items}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;