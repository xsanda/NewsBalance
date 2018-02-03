from newspaper import Article
import requests
import json

def article_gather(keyword):
	"The function returns a JSON object of the scraped data from the 20 most relevant news sources"
	
	newsApiUrl = ('https://newsapi.org/v2/everything?q=' + keyword + '&sortBy=relevance&apiKey=bb69ad9aebf04d738bd9442cca1eca7a')

	response = requests.get(newsApiUrl)

	data = response.json()

	newsArticles = []

	for entry in data['articles']:
		url = entry['url']
		article = Article(url)
		article.download()

		try:
			article.parse()
			article.nlp()	
		except:
			pass

		articledict = {
			'url' : url,
			'title' : article.title,
			'authors' : article.authors,
			'text' : article.text,
			'summary' : article.summary
		}
		newsArticles.append(articledict)

	newsArticlesDirectory = {
		'articles' : newsArticles
	}
	return json.dumps(newsArticlesDirectory)