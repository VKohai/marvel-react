import "./characterSearchForm.scss";

const CharacterSearchForm = () => {
    return (
        <div className="char__search-form">
            <div className="char__search-label">Or find a character by name:</div>
            <div className="char__search-wrapper">
                <input type="text" name="name" />
            </div>
        </div>
    );
}

export default CharacterSearchForm;