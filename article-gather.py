from newspaper import Article
import requests
import json
import time
from multiprocessing import Pool

def download(url):
	url = url['url']
	article = Article(url)
	article.download()

	try:
		article.parse()
		articledict = {
			'url' : url,
			'title' : article.title,
			'authors' : article.authors,
			'text' : article.text,
			'summary' : article.text[:100] + '...'
		}
		return articledict
	except:
		pass

def article_gather(keyword):
	"The function returns a JSON object of the scraped data from the 20 most relevant news sources"
	
	newsApiUrl = ('https://newsapi.org/v2/everything?q=' + keyword + '&sortBy=relevance&language=en&from=2018-01-03&apiKey=bb69ad9aebf04d738bd9442cca1eca7a')

	response = requests.get(newsApiUrl)

	data = response.json()

	newsArticles = []
	with Pool(20) as p:
		newsArticles = p.map(download, data['articles'])

	newsArticlesDirectory = {
		'articles' : newsArticles
	}

	return json.dumps(newsArticlesDirectory)