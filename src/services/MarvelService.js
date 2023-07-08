import { useMemo } from "react";
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, error, request } = useHttp();
    const _BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
    const _API_KEY = 'b560d3ebe26a89cfd4717f47bf9fb66f';
    let base_offset = 0;

    let totalCharacters = useMemo(async () => {
        const response = await request(`${_BASE_URL}characters?limit=${1}&apikey=${_API_KEY}`);
        return response.data.total;
    }, []);

    // https://gateway.marvel.com:443/v1/public/characters?limit=9&apikey=
    const getCharacters = async (limit, offset = base_offset) => {
        const response = await request(`${_BASE_URL}characters?limit=${limit}&offset=${offset}&apikey=${_API_KEY}`);
        return response.data.results.map(parseCharacter);
    }

    // https://gateway.marvel.com:443/v1/public/characters/2?apikey=
    const getCharacterById = async (id) => {
        const response = await request(`${_BASE_URL}characters/${id}?apikey=${_API_KEY}`);
        return parseCharacter(response.data.results[0]);
    }

    const parseCharacter = (character) => {
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

    return { loading, error, getCharacters, getCharacterById };
}

export default useMarvelService;