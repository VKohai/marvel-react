import "./characterSearchForm.scss";
import { Field, Formik, Form } from "formik";

const CharacterSearchForm = () => {
    return (
        <div className="char__search-form">
            <Formik>
                {({ isSubmitting }) => (
                    <Form>
                        <div className="char__search-label">Or find a character by name:</div>
                        <div className="char__search-wrapper">
                            <Field type="text" name="name" />
                            <button
                                className="button button__main"
                                type="submit"
                                disabled={isSubmitting}>
                                <div className="inner">FIND</div>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default CharacterSearchForm;