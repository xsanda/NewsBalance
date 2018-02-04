from flask import Flask, request, Response, jsonify
import http.client, urllib.request, urllib.parse, urllib.error
import requests
import json
import redis


# Gets news sources and the text of the news article
from article_gather import article_gather

# Converts words into doc2vec representation and finds
# the most different articles using cosine similarity
from poc import polarize

app = Flask(__name__)

cache = redis.StrictRedis(host="localhost", port=6379, db=0)

@app.route('/', methods=['GET'])
def retrieveResults():
    searchTerms = request.args.get("q").lower().strip()
    if cache.get(searchTerms):
        result = jsonify(result=json.loads(cache.get(searchTerms)))
        result.headers['Access-Control-Allow-Origin'] = '*'
        return result
    else:
        # newsApiResult is a list of articles
        newsApiResult = article_gather(searchTerms)
        # Contains a list ordered by spectrum
        articlesResult = polarize(newsApiResult["articles"])
        cache.set(searchTerms, json.dumps(articlesResult))

        # Return final result to request
        result = jsonify(result=articlesResult)
        result.headers['Access-Control-Allow-Origin'] = '*'
        return result

if __name__ == "__main__":
    app.run()
