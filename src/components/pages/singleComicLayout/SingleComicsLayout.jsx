import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './singleComicsLayout.scss';

const SignleCharacterLayout = ({ data }) => {
    const { title, description, price, language, thumbnail, pageCount } = data;
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={description ? description : title} />
                <title>{title}</title>
            </Helmet>
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description ? description : 'No description'}</p>
                    <p className="single-comic__descr">{pageCount} pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price === 0 ? "Not avaliable" : `${price}$`}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    );
}

export default SignleCharacterLayout;