class MarvelService {
    #BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
    #API_KEY = 'a8d09a552b37f6754f38c96deae0ac1f';

    request = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}.\tStatus: ${response.status}`);
        }
        return response.json();
    }

    // https://gateway.marvel.com:443/v1/public/characters?apikey=
    getCharacters = async () => {
        const response = await this.request(`${this.#BASE_URL}characters?apikey=${this.#API_KEY}`);
        return response.data.results.map(this.#parseCharacter);
    }

    // https://gateway.marvel.com:443/v1/public/characters/2?apikey=
    getCharacterById = async (id) => {
        const response = await this.request(`${this.#BASE_URL}characters/${id}?apikey=${this.#API_KEY}`);
        return this.#parseCharacter(response.data.results[0]);
    }

    #parseCharacter = (character) => {
        // http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg
        const thumbnailPath = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        return {
            name: character.name,
            description: character.description,
            thumbnail: thumbnailPath,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        };
    }
}


export default MarvelService;