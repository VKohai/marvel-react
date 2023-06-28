import { Component } from "react";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

class App extends Component {
    state = {
        selectedCharacterId: null
    }

    onCharacterSelected = (id) => {
        this.setState({ selectedCharacterId: id })
    }

    checkIfImageAvaliable = (thumbnail) => {
        if (typeof (thumbnail) === "string") {
            return thumbnail.match("image_not_available") || thumbnail.match("4c002e0305708") ? { objectFit: "contain" } : null
        }
        return false;
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar
                            checkIfImageAvaliable={this.checkIfImageAvaliable} />
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList
                                onCharacterSelected={this.onCharacterSelected}
                                checkIfImageAvaliable={this.checkIfImageAvaliable} />
                        </ErrorBoundary>
                        <CharInfo
                            characterId={this.state.selectedCharacterId}
                            checkIfImageAvaliable={this.checkIfImageAvaliable} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;