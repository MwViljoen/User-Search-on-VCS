/* importing all css files and all components */

import './App.css';
import React, {Component} from 'react';
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import Results from "./Components/Results/Results";
import LoadingComponent from "./Components/LoadingComponent/LoadingComponent";
/* app is the parent where all states are lifted to */
class App extends Component {
    constructor(props) {
        super(props);
        /*@isLoaded is used to show that operations are in progress
        * @error stores error value
        * @items stores the fetch api data from express
        * @searchInputValue used to store the user input data from a form
        * @handleMoreInfo both states store the state of the reveal more info when user clicks
        * on a user div*/
        this.state = {
            isLoaded: false,
            error: '',
            items: [],
            searchInputValue: '',
            handleMoreInfoGitHub: false,
            handleMoreInfoGitLab: false
        }
        /*binding all event handlers*/
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClickGitHub = this.handleClickGitHub.bind(this);
        this.handleClickGitLab = this.handleClickGitLab.bind(this);
    }
    /*stores input from user input box and updates on each cahnge*/
    handleSearchInput(e) {
        this.setState({
            searchInputValue: e
        })
    }
    /*Handle search is used to fetch the data that the backend provides and returns the data as constructed in
    * express */
    handleSearch() {
        const searchInput = this.state.searchInputValue;
        /*as soon as we enter the event we set @isLoaded true since we have started with fetching the data
        * this also allows us to use this state to make a loading screeen
        * we also set the fetched items to nothing again so that if the user searches again
        *  the loading screen will appear again*/
        this.setState({
            isLoaded: true,
            items: []
        });
        /*here we fetch using a post method and send the user input from the states as a parameter
        * then we wait for the promise to resolve
        * if the promise resolves we convert the response into a Object
        * we then use the object and set the items state to the object*/
        fetch(`/username/${searchInput}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    items: data,
                    isLoaded: false
                });
            })
            .catch((error) => {
                this.setState({
                    error: error
                })
            });
    }
    /* this is a state used as a tick box almost and will be a dropdown for more info when clicked and
    * the dropdown will close if clicked again*/
    handleClickGitHub(){
        if(this.state.handleMoreInfoGitHub){
            this.setState({
                handleMoreInfoGitHub: false
            })
        }
        else{
            this.setState({
                handleMoreInfoGitHub: true
            })
        }
    }
    /* similar to above event just for different component*/
    handleClickGitLab(){
        if(this.state.handleMoreInfoGitLab){
            this.setState({
                handleMoreInfoGitLab: false
            })
        }
        else{
            this.setState({
                handleMoreInfoGitLab: true
            })
        }
    }

    render() {
        /*setting state values to short hand variables*/
        const {searchInputValue, items, isLoaded, handleMoreInfoGitHub, handleMoreInfoGitLab} = this.state;
        /*If the items state is empty we know we did not receive anything from express
        * since we know we will get a response either way
        * if the items is not empty we re render the Header and search Box as is with as is data
        * but with component Result and pass down data to this component to handle the rest*/
        if (items.length > 0) {
            return (
                <div className="App">
                    <Header/>
                    <Search
                        searchInput={this.handleSearchInput}
                        searchInputValue={searchInputValue}
                        handleSearchEvent={this.handleSearch}
                    />
                    <Results
                        items={items}
                        clickEventGitHub={this.handleClickGitHub}
                        handleMoreInfoGitHub={handleMoreInfoGitHub}
                        clickEventGitLab={this.handleClickGitLab}
                        handleMoreInfoGitLab={handleMoreInfoGitLab}
                    />
                </div>
            );
        }
        /*if is loaded is active we know we are waiting and render the header search box and a loading screen/
            component*/
        else if (isLoaded) {
            return (
                <div className="App">
                    <Header/>
                    <Search
                        searchInput={this.handleSearchInput}
                        searchInputValue={searchInputValue}
                        handleSearchEvent={this.handleSearch}
                    />
                    <LoadingComponent/>
                </div>
            );

        }
        /*else if none of the above we simply just load header and search box and wait for user interaction*/
        else {
            return (
                <div className="App">
                    <Header/>
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

export default App;