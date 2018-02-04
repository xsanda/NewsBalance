import React from 'react';

function parseDomain(url) {
    return /\/\/(?:www\.)?([^/]+)/.exec(url)[1] || url;
}

function NewsView({article: {title, url, image, summary, source, date}}) {
    const {domain, tld} = parseDomain(source || url);
    const site = `${domain}.${tld}`;
    return (
        <a href={url} className="news-view">
            <h3 
                className={image ? "image" : ""}
                style={{backgroundImage: `url(${image})`}}>
                <img src={image} alt="" />
                <span>{title}</span>
            </h3>
            <h6>{site}{date ? ` · ${date}` : ''}</h6>
            <p>{summary}</p>
        </a>
    )
}

function NewsDescription({article: {title, url, source, date}}) {
    const domain = parseDomain(source || url);
    return (
        <a href={url} className={"news-description"}>
            <h4>{title}</h4>
            {domain || date ? ' – ' : ''}{domain || ''}{domain && date ? ' · ' : ''}{date || ''}
        </a>
    )
}

export function NewsStory({articles: {result}}) {
    return (
        <div className="news-story">
            <div className="news-views">
                <NewsView article={result[0][0]} />
                <NewsView article={result[1][0]} />
            </div>

            <div className="news-spectrum">
                <div>
                    {result[0].slice(1).map((article,i) => (
                        <NewsDescription
                            article={article}
                            key={i} />
                    ))}
                </div>
                <div>
                    {result[1].slice(1).map((article,i) => (
                        <NewsDescription
                            article={article}
                            key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
