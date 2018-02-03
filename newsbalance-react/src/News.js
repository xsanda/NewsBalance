import React from 'react';

function NewsView({article: {title, url, image, summary, source}}) {
    return (
        <a href={url} className="news-view">
            <h3 style={{backgroundImage: `url(${image})`}}>
                <img src={image} alt="" />
                <span>{title}</span>
            </h3>
            <h6>{source}</h6>
            <p>{summary}</p>
        </a>
    )
}

function NewsDescription({article: {title, url, source}}) {
    return (
        <a href={url} className="news-description">
            <h4>{title}</h4> – {source}
        </a>
    )
}

export function NewsStory({articles}) {
    return (
        <div className="news-story">
            <div className="news-views">
                <NewsView article={articles[0]} />
                <NewsView article={articles[articles.length-1]} />
            </div>

            <div className="news-spectrum">
                {articles.slice(1,-1).map((article,i) => (
                    <NewsDescription article={article} key={i} />
                ))}
            </div>
        </div>
    );
}