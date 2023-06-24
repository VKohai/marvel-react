class MarvelService {
    __BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
    __API_KEY = 'a8d09a552b37f6754f38c96deae0ac1f';

    request = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Couldn't fetch ${url}.\tStatus: ${response.status}`);
        }
        return response.json();
    }

    // https://gateway.marvel.com:443/v1/public/characters?apikey=
    getCharacters = async () => {
        return await this.request(`${this.__BASE_URL}characters?apikey=${this.__API_KEY}`);
    }

    // https://gateway.marvel.com:443/v1/public/characters/2?apikey=
    getCharacterById = async (id) => {
        return await this.request(`${this.__BASE_URL}characters/${id}?apikey=${this.__API_KEY}`);
    }
}


export default MarvelService;