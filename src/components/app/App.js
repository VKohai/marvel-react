import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";


function App() {
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

                        </Route>
                        <Route exact path="/comics">

                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;