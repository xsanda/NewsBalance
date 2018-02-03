import numpy
import nltk
import scipy.spatial
import itertools
from gensim.models import KeyedVectors

wordvec = KeyedVectors.load_word2vec_format("./models/GoogleNews-vectors-negative300.bin", binary=True)

def doc2vec(doc):
    return sum(wordvec.get_vector(word) for word in nltk.word_tokenize(doc) if word in wordvec) 

def polarize(docs):
    return max(itertools.combinations(docs, 2), key = lambda doc_1_2: scipy.spatial.distance.cosine(doc2vec(doc_1_2[0]), doc2vec(doc_1_2[1])))
