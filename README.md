# NewsBalance

Our entry for Facebook’s London regional hackathon 2018. NewsBalance uses natural language processing to find articles of different bias on top news stories, to allow the reader to get a balanced understanding of the story.

The system first searches for the input string using in an api called `web-hose`. It then starts splitting each input document into it's component words and then running these words through word2vec. We then sum all of these vectors to allow us to create a document vector. We then performed k-means on the set of all documents that showed up in the search, and used the computed centres to come up with our categories. We then stick the input-output mapping in a `redis` cache to allow us to operate at speed for subsequent queries. A `react.js` front-end allows the user to search for topics and visually compare them.

## The team

- [Aayush Chadha](https://www.linkedin.com/in/aayush-c-970566107/)
- [Amartya Vadlamani](https://www.linkedin.com/in/avadlamani/)
- [Charlie Harding](https://www.linkedin.com/in/charlie-harding/)
- [Prabhat Verma](https://www.linkedin.com/in/prabhat-verma/)