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
def test():
    return Response('It works')

@app.route('/<searchTerms>', methods=['GET'])
def retrieveResults(searchTerms):
    # newsApiResult is a list of articles
    newsApiResult = article_gather(searchTerms)
    # Contains a list ordered by spectrum
    articlesResult = polarize(newsApiResult)

    # Return final result to request
    return jsonify(result=articlesResult)

