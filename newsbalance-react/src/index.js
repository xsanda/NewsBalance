import React from 'react';
import ReactDOM from 'react-dom';
import {NewsStory} from './News';
import './index.css';

function Header({handleSearch}) {
    return (
        <header>
            <img class src="/masthead.png" alt="The News Balance" />
            <Search handleSearch={handleSearch} />
        </header>
    );
}

class Search extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        const term = this.refs.search.value;
        this.refs.search.blur();
        this.props.handleSearch(term);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div class="search">
                    <input
                        ref="search"
                        type="text"
                        placeholder="Search…"
                    />
                </div>
            </form>
        );
    }
}

class App extends React.Component {
    fetchNews() {
        return [{
            title: "Russian fighter jet shot down in Syria",
            source: "The New York Post",
            url: 'https://google.com/',
            image: "https://ichef-1.bbci.co.uk/news/660/cpsprodpb/5485/production/_99873612_colne-station.jpg",
            summary: "Prominent Brexiteer Jacob Rees-Mogg has accused Treasury officials of \"fiddling the figures\" on Brexit to keep the UK in the European Union customs union."
        }, {
            title: "Moderate 1",
            source: "The New Yorker",
            url: 'https://wikipedia.org/',
            image: "https://ichef.bbci.co.uk/news/660/cpsprodpb/AD31/production/_99873344_gettyimages-856957494.jpg",
            summary: "A father and son have sold their two Cardiff cafes to test their new shark deterrent invention off South Africa.",
        }, {
            title: "Moderate 2",
            source: "The New Yorker",
            url: 'https://wikipedia.org/',
            image: "https://ichef.bbci.co.uk/news/660/cpsprodpb/AD31/production/_99873344_gettyimages-856957494.jpg",
            summary: "A father and son have sold their two Cardiff cafes to test their new shark deterrent invention off South Africa.",
        }, {
            title: "Three men charged with inmate's murder",
            source: "The New Yorker",
            url: 'https://wikipedia.org/',
            image: "https://ichef.bbci.co.uk/news/660/cpsprodpb/AD31/production/_99873344_gettyimages-856957494.jpg",
            summary: "A father and son have sold their two Cardiff cafes to test their new shark deterrent invention off South Africa.",
        }];
    }

    constructor(props) {
        super(props);
        this.state = {searchTerm: ""};
        this.handleSearch = term => {
            this.setState({searchTerm: term});
            console.log(term);
        };
    }
    render() {
        return (
            <div class={this.state.searchTerm ? [] : ["empty"]}>
                <Header handleSearch={this.handleSearch} />
                {this.state.searchTerm
                    ? <NewsStory articles={this.fetchNews()} />
                    : null}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
