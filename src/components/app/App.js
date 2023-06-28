import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
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
                    <RandomChar
                        checkIfImageAvaliable={this.checkIfImageAvaliable} />
                    <div className="char__content">
                        <CharList
                            checkIfImageAvaliable={this.checkIfImageAvaliable} />
                        <CharInfo />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;