import "./characterSearchForm.scss";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";
const CharacterSearchForm = () => {
    const [character, setCharacter] = useState(null);
    const [result, setResult] = useState(null);
    const { loading, error, clearError, getCharacterByName } = useMarvelService();

    const onCharacterLoaded = (character) => {
        setCharacter(character);
        const elem = character ?
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visist {character.name} page?</div>
                <Link to={`/characters/${character.id}`} className="button button__secondary">
                    <div className="inner">TO PAGE</div>
                </Link>
            </div> :
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>;
        setResult(elem);
    }

    const updateCharacter = (name) => {
        clearError();
        getCharacterByName(name).then(onCharacterLoaded);
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string().min(2, "Min 2 characters").required('This field is required')
                })}
                onSubmit={({ name }) => updateCharacter(name)}>
                <Form>
                    <div className="char__search-label">Or find a character by name:</div>
                    <div className="char__search-wrapper">
                        <Field type="text" name="name" id="name" placeholder="Enter name" />
                        <button
                            className="button button__main"
                            type="submit"
                            disabled={loading}>
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                    <ErrorMessage className="char__search-error" name="name" component="div" />
                </Form>
            </Formik>
            {errorMessage}
            {result}
        </div >
    );
}

export default CharacterSearchForm;