import { useState } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharacterId, setCharacterId] = useState(null);

    function onCharacterSelected(id) {
        setCharacterId(id);
    }

    function checkIfImageAvaliable(thumbnail) {
        if (typeof (thumbnail) === "string") {
            return thumbnail.match("image_not_available") || thumbnail.match("4c002e0305708") ? { objectFit: "contain" } : null
        }
        return false;
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar
                    checkIfImageAvaliable={checkIfImageAvaliable} />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onCharacterSelected={onCharacterSelected}
                        checkIfImageAvaliable={checkIfImageAvaliable} />
                </ErrorBoundary>
                <CharInfo
                    characterId={selectedCharacterId}
                    checkIfImageAvaliable={checkIfImageAvaliable} />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
}

export default MainPage;
