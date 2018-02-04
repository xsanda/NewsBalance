import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import {NewsStory} from './News';
import masthead from './masthead.png';
import './index.css';

function Header({handleSearch}) {
    return (
        <header>
            <img src={masthead} alt="The News Balance" />
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
                <div className="search">
                    <input
                        ref="search"
                        type="text"
                        placeholder="Search…"
                    />
                </div>
                <button action="submit"><FontAwesome name='arrow-right' /></button>
            </form>
        );
    }
}

function Spinner() {
    return (
        <div className="spinner"/>
    );
}

class App extends React.Component {
    async doSearch(q) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        return [[{
            title: q+" fighter jet shot down in Syria",
            url: 'https://google.com/',
            image: "https://ichef-1.bbci.co.uk/news/660/cpsprodpb/5485/production/_99873612_colne-station.jpg",
            summary: "Prominent Brexiteer Jacob Rees-Mogg has accused Treasury officials of \"fiddling the figures\" on Brexit to keep the UK in the European Union customs union."
        }, {
            title: "Moderate 1 about "+q,
            url: 'https://wikipedia.org/',
            image: "https://ichef.bbci.co.uk/news/660/cpsprodpb/AD31/production/_99873344_gettyimages-856957494.jpg",
            summary: "A father and son have sold their two Cardiff cafes to test their new shark deterrent invention off South Africa.",
        }], [{
            title: "Moderate 2 on the topic of "+q,
            url: 'https://wikipedia.org/',
            image: "https://ichef.bbci.co.uk/news/660/cpsprodpb/AD31/production/_99873344_gettyimages-856957494.jpg",
            summary: "A father and son have sold their two Cardiff cafes to test their new shark deterrent invention off South Africa.",
        }, {
            title: "Three men charged with "+q+"'s murder",
            url: 'https://wikipedia.org/',
            image: "https://ichef.bbci.co.uk/news/660/cpsprodpb/AD31/production/_99873344_gettyimages-856957494.jpg",
            summary: "A father and son have sold their two Cardiff cafes to test their new shark deterrent invention off South Africa.",
        }]];
    }

    constructor(props) {
        super(props);
        this.state = {searching: false, searchResults: null};
        this.handleSearch = async term => {
            this.setState({searching: true, searchResults: null});
            let searchResults = await this.doSearch(term);
            this.setState({searchResults, searching: false});
        };
    }
    render() {
        return (
            <div className={this.state.searchResults ? [] : ["empty"]}>
                <Header handleSearch={this.handleSearch} />
                {this.state.searching
                    ? <Spinner />
                    : this.state.searchResults
                    ? <NewsStory articles={this.state.searchResults} />
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
