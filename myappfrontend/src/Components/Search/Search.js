import React, {Component} from 'react';
import './searchStyles.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleInput=this.handleInput.bind(this);
        this.handleSearchButton=this.handleSearchButton.bind(this);
    }

    handleInput(e) {
        this.props.searchInput(e.target.value);
    }

    handleSearchButton(e){
        e.preventDefault();
        this.props.handleSearchEvent();
    }

    render() {
        const {searchInputValue} = this.props;
        return (
            <form onSubmit={this.handleSearchButton} className="form-container">
                <fieldset>
                    <legend>Add a Car</legend>
                    <input value={searchInputValue}
                           onChange={this.handleInput}
                           placeholder="Search by username"
                           type='text'
                           required
                    />
                    <button type='submit'>Search</button>
                </fieldset>
            </form>
        );
    }
}

export default Search;