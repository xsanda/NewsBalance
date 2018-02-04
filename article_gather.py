
import newspaper
import requests
import json
import time
import re
from multiprocessing import Pool

def dedirect(url):
    html = requests.get(url).text
    match = re.search('refresh"\s+content="\d+;\s*url=([^"]*)"',html)
    if match:
        return match.group(1)
    else:
        return url

def download(post):
    url = post['thread']['url']
    try:
        url = dedirect(url)
        article = newspaper.Article(url)
        article.download()
        article.parse()
        articledict = {
            'url' : url,
            'title' : article.title,
            'authors' : article.authors,
            'text' : article.text,
            'summary' : article.text[:100] + '...'
        }
        print(articledict)
        return articledict
    except Exception as e:
        print(e)
#http://webhose.io/filterWebContent?token=f063d591-11ac-43ae-842d-0814f86a6609&format=json&sort=crawled&q=Brexit%20language%3Aenglish%20site_type%3Anews%20domain_rank%3A%3C1000%20performance_score%3A%3E3%20published%3A%3E1514764800000%20spam_score%3A%3C0.8

def article_gather(keyword):
    "The function returns a JSON object of the scraped data from the 20 most relevant news sources"
    
    newsApiUrl = 'http://webhose.io/filterWebContent?token=f063d591-11ac-43ae-842d-0814f86a6609&format=json&sort=crawled&q=' + keyword + '%20language%3Aenglish%20site_type%3Anews%20domain_rank%3A%3C1000%20performance_score%3A%3E3%20published%3A%3E1514764800000%20spam_score%3A%3C0.8'
    
    options = {
        "token": "f063d591-11ac-43ae-842d-0814f86a6609",
        "q": keyword,
        "language": "english",
        "site_type": "news",
        "domain_rank": "<1000",
        "performance_score": ">3",
        "published": ">1514764800000",
        "spam_score": "<0.8"
    }

    response = requests.get(newsApiUrl)
    data = response.json()
    newsArticles = []
    with Pool(len(data['posts'])) as p:
        newsArticles = p.map(download, data['posts'])

    newsArticlesDirectory = {
        'articles' : newsArticles
    }

    return newsArticlesDirectory