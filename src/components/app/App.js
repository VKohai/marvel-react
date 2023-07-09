import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import ComicsList from "../comicsList/ComicsList";
import AppBanner from './../appBanner/AppBanner';

function App() {
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
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/">
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
                        </Route>
                        <Route exact path="/comics">
                            <AppBanner />
                            <ComicsList checkIfImageAvaliable={checkIfImageAvaliable} />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;