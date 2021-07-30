/*

*** NOTE ***
I wanted to use router but due to many things it is recommended to not use redux
reason for this is that when using router it reloads the page and all state data is lost
thus it is required to use redux, but in this case i will not go with redux and just make use of state to do the same
thing

I will also not remove this code nor the comments in the App.js since i feel it is important to understand this and
keep it for future information as well as for my up coming mentor session



import React, {Component} from 'react';
import Search from "../Search/Search";
import Results from "../Results/Results";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

class Main extends Component {
    constructor(props) {
        super(props);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearchInput(e) {
        this.props.searchInput(e);
    }

    handleSearch() {
        this.props.handleSearchEvent();
    }

    render() {
        const {searchInputValue, items, isLoaded} = this.props;
        if (items.length > 0) {
            return (
                <div className="App">
                    <Search
                        searchInput={this.handleSearchInput}
                        searchInputValue={searchInputValue}
                        handleSearchEvent={this.handleSearch}
                    />
                    <Results items={items}/>
                </div>
            );
        } else if (isLoaded) {
            return (
                <div className="App">
                    <Search
                        searchInput={this.handleSearchInput}
                        searchInputValue={searchInputValue}
                        handleSearchEvent={this.handleSearch}
                    />
                    <LoadingComponent/>
                </div>
            );

        } else {
            return (
                <div className="App">
                    <Search
                        searchInput={this.handleSearchInput}
                        searchInputValue={searchInputValue}
                        handleSearchEvent={this.handleSearch}
                    />
                </div>
            );
        }
    }
}

export default Main;*/
