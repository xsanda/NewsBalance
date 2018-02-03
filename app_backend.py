from flask import Flask, request, Response, jsonify
import http.client, urllib.request, urllib.parse, urllib.error
import requests

# Gets news sources and the text of the news article
from article_gather import article_gather

# Converts words into doc2vec representation and finds
# the most different articles using cosine similarity
from poc import polarize

app = Flask(__name__)

@app.route('/', methods=['GET'])
def retrieveResults():
    searchTerms = request.args.get("q")
    # newsApiResult is a list of articles
    newsApiResult = article_gather(searchTerms)
    # Contains a list ordered by spectrum
    articlesResult = polarize(newsApiResult["articles"])

    # Return final result to request
    return jsonify(result=articlesResult)

if __name__ == "__main__":
    app.run()
