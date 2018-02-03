from newspaper import Article
import requests
import json

def article_gather(keyword):
	"The function returns a JSON object of the scraped data from the 20 most relevant news sources"
	
	newsApiUrl = ('https://newsapi.org/v2/everything?q=' + keyword + '&sortBy=relevance&language=en&from=2018-01-03&apiKey=bb69ad9aebf04d738bd9442cca1eca7a')

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
			articledict = {
				'url' : url,
				'title' : article.title,
				'authors' : article.authors,
				'text' : article.text,
				'summary' : article.summary
			}
			newsArticles.append(articledict)
	
		except:
			pass


	newsArticlesDirectory = {
		'articles' : newsArticles
	}

	return newsArticlesDirectory

with open("jsonfile.json", "w") as f:
		json.dump(article_gather("Donald Trump"), f)