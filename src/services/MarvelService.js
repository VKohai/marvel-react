class MarvelService {
    #BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
    #API_KEY = 'b560d3ebe26a89cfd4717f47bf9fb66f';
    base_offset = 0;
    totalCharacters;

    constructor() {
        this.initTotal();
    }

    initTotal = async () => {
        const response = await this.request(`${this.#BASE_URL}characters?limit=${1}&apikey=${this.#API_KEY}`);
        this.totalCharacters = response.data.total;
    }

    request = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}.\tStatus: ${response.status}`);
        }
        return response.json();
    }

    // https://gateway.marvel.com:443/v1/public/characters?limit=9&apikey=
    getCharacters = async (limit, offset = this.base_offset) => {
        const response = await this.request(`${this.#BASE_URL}characters?limit=${limit}&offset=${offset}&apikey=${this.#API_KEY}`);
        return response.data.results.map(this.#parseCharacter);
    }

    // https://gateway.marvel.com:443/v1/public/characters/2?apikey=
    getCharacterById = async (id) => {
        const response = await this.request(`${this.#BASE_URL}characters/${id}?apikey=${this.#API_KEY}`);
        return this.#parseCharacter(response.data.results[0]);
    }

    #parseCharacter = (character) => {
        const thumbnailPath = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: thumbnailPath,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        };
    }
}

export default MarvelService;