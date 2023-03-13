import * as React from 'react';
import PropTypes from 'prop-types';

const App = ({ articles }) => {
  const [news] = React.useState(articles);

  return (
    <div className="env-cardholder-grid">
      {news.length > 0
        ? news.map((article) => {
            return (
              <article
                key={article.NODE_ID}
                className="env-card env-block env-shadow"
              >
                <header className="env-card__header">
                  <img
                    className="env-card__image"
                    src={article.IMG_URL}
                    alt="Article image"
                  />
                </header>
                <div className="env-card__body">
                  <h2 className="env-card__text--title">
                    <a className="env-link-secondary" href={article.URL}>
                      {article["SV.Title"]}
                    </a>
                  </h2>
                  <div>
                    <p className="env-card__text">
                      {article["SV.Description"].length > 100
                        ? `${article["SV.Description"].substring(0, 100)}...`
                        : article["SV.Description"]}
                    </p>
                  </div>
                  <div>
                    <p className="env-card__text">
                      {article["SV.Content"].length > 300
                        ? `${article["SV.Content"].substring(0, 300)}...`
                        : article["SV.Content"]}
                    </p>
                  </div>
                </div>
              </article>
            );
          })
        : "Inga artiklar att visa"}
    </div>
  );
};

App.propTypes = {
  articles: PropTypes.array,
};

export default App;
