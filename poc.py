import numpy
import nltk
import scipy.spatial
from scipy.cluster.vq import kmeans
import itertools
from gensim.models import KeyedVectors

dist = scipy.spatial.distance.euclidean

wordvec = KeyedVectors.load_word2vec_format("./models/GoogleNews-vectors-negative300.bin", binary=True)

def doc2vec(doc):
    return sum(wordvec.get_vector(word) for word in nltk.word_tokenize(doc) if word in wordvec) 

def polarize(docs):

    docs = [(doc, doc2vec(doc["text"])) for doc in docs if doc != None]#and len(nltk.word_tokenize(doc["text"])) > 50}
    codebook, distortion = kmeans(numpy.asarray(list(map(lambda x: x[1], docs))), 2, iter=40)
    
    return [
            list(doc for doc, v in sorted([(doc,vec) for doc, vec in docs if dist(vec, codebook[0]) > dist(vec, codebook[1])], key=lambda dv: dist(dv[1],codebook[1]))),
            list(doc for doc, v in sorted([(doc,vec) for doc, vec in docs if dist(vec, codebook[0]) < dist(vec, codebook[1])], key=lambda dv: dist(dv[1],codebook[0])))]
