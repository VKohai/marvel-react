import { useState } from "react";
import { Helmet } from "react-helmet";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharacterSearchForm from "../characterSearchForm/CharacterSearchForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharacterId, setCharacterId] = useState(null);

    function onCharacterSelected(id) {
        setCharacterId(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onCharacterSelected={onCharacterSelected} />
                </ErrorBoundary>
                <div>
                    <CharInfo
                        characterId={selectedCharacterId} />
                    <ErrorBoundary>
                        <CharacterSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
}

export default MainPage;
