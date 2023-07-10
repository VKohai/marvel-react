import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404 } from "../pages";

function App() {


    return (
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="*" />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;