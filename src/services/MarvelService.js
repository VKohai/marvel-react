import { useMemo } from "react";
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();
    const _BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
    const _API_KEY = 'b560d3ebe26a89cfd4717f47bf9fb66f';
    let baseOffset = 0;

    let totalCharacters = useMemo(async () => {
        const response = await request(`${_BASE_URL}characters?limit=${1}&apikey=${_API_KEY}`);
        return response.data.total;
        // eslint-disable-next-line
    }, []);

    // https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=0&apikey=
    const getCharacters = async (limit, offset = baseOffset) => {
        const response = await request(`${_BASE_URL}characters?limit=${limit}&offset=${offset}&apikey=${_API_KEY}`);
        return response.data.results.map(parseCharacter);
    }

    // https://gateway.marvel.com:443/v1/public/characters/2?apikey=
    const getCharacterById = async (id) => {
        const response = await request(`${_BASE_URL}characters/${id}?apikey=${_API_KEY}`);
        return parseCharacter(response.data.results[0]);
    }
    // https://gateway.marvel.com:443/v1/public/comics?limit=9&offset=0&apikey=
    const getComics = async (limit, offset = baseOffset) => {
        const response = await request(`${_BASE_URL}comics?limit=${limit}&offset=${offset}apiKey=${_API_KEY}`);
        return response.data.results.map(parseComics);
    }

    const parseCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: parseThumbnail(character),
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        };
    }

    const parseComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices.price,
            thumbnail: parseThumbnail(comics)
        };
    }

    const parseThumbnail = (item) => `${item.thumbnail.path}.${item.thumbnail.extension}`;

    return {
        loading, error, clearError,
        totalCharacters, baseOffset, getCharacters, getCharacterById, getComics
    };
}

export default useMarvelService;