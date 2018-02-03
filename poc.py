import numpy
import nltk
import scipy.spatial
import itertools
from gensim.models import KeyedVectors

wordvec = KeyedVectors.load_word2vec_format("./models/GoogleNews-vectors-negative300.bin", binary=True)

def doc2vec(doc):
    return sum(wordvec.get_vector(word) for word in nltk.word_tokenize(doc) if word in wordvec) 

def polarize(docs):
    docs = [doc for doc in docs if len(nltk.word_tokenize(doc["text"])) > 50]
    furthest = max(itertools.combinations(docs, 2), key = lambda doc_1_2: scipy.spatial.distance.cosine(doc2vec(doc_1_2[0]["text"]), doc2vec(doc_1_2[1]["text"])))
    return list(sorted(docs, key=lambda doc: scipy.spatial.distance.cosine(doc2vec(doc["text"]), doc2vec(furthest[0]["text"]))))
