import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './index.css';

class SearchBar extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      searchTerms: []
    }
    
    this.captureSearchTerms = this.captureSearchTerms.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.bindSearchOnEnterKey = this.bindSearchOnEnterKey.bind(this);
  }
  
  componentDidMount() {
    
    this.bindSearchOnEnterKey();
  }
  
  captureSearchTerms(event) {
    
    let search = event.target.value;
    
    var separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
    let ignoredWords = ['of', 'the', 'in', 'on', 'at', 'to', 'a', 'is'];
    
    let searchTerms = search
      .toLowerCase()
      .replace(new RegExp('\\b(' + ignoredWords.join('|') + ')\\b', 'g'), '')
      .split(new RegExp(separators.join('|'), 'g'));
    
    searchTerms = searchTerms
      .filter(term => term && term.length > 1)
      .map(term => {
      
        return term.replace(/[^\w\s]/gi,''); // remove special characters
      });
    
    this.setState({searchTerms});
  }
  
  submitSearch() {
    
    let { getCatalogItemsBySearchTerm } = this.props;
    let { searchTerms } = this.state;

    getCatalogItemsBySearchTerm(searchTerms);
  }
  
  bindSearchOnEnterKey() {
    
    document.querySelector(".SearchTerm").addEventListener('keypress', function(e) {
      
      let isEnterKey = e.keyCode === 13;
      
      if(isEnterKey) {
        
        this.submitSearch();
      }
    }.bind(this), false);
  }
  
  render() {
    
    let { location } = this.props;

    return (   
      
     <form role="search" onSubmit={(e) => {e.preventDefault(); return false;}} className={ location.pathname === "/" ? "Search WideSearch" : "Search SqueezedSearch" }>
       <input type="search" aria-label="search text" className="SearchTerm" placeholder="Search" maxLength="60" onChange={(event) => this.captureSearchTerms(event)} />
       <button type="submit" aria-label="Submit Search" className="SearchButton" onClick={() => this.submitSearch()}>
         <i className="fa fa-search"></i>
       </button>
     </form>

    );
  }
}

export const SearchBarSection = withRouter(SearchBar);
