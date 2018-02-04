import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request-promise-native';
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
        return await request({uri: "http://localhost:5000/", qs: {q}, json: true})
            .catch(() => {
                this.setState({searching: false, searchResults: null});
            });
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
