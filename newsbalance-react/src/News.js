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

function NewsDescription({article: {title, url, source, date}, newCol}) {
    const {domain, tld} = parseDomain(source || url);
    const site = `${domain}.${tld}`;
    return (
        <a href={url} className={"news-description " + (newCol ? "new-col" : "")}>
            <h4>{title}</h4>
            {site || date ? ' – ' : ''}{site || ''}{site && date ? ' · ' : ''}{date || ''}
        </a>
    )
}

export function NewsStory({articles}) {
    return (
        <div className="news-story">
            <div className="news-views">
                <NewsView article={articles[0][0]} />
                <NewsView article={articles[1][0]} />
            </div>

            <div className="news-spectrum">
                {articles.map((cluster,i) => (
                    cluster.slice(1).map((article,j) => (
                    <NewsDescription
                        article={article}
                        key={j*2+i}
                        newCol={j === 0} />
                ))))}
            </div>
        </div>
    );
}