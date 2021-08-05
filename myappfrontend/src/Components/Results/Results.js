/*Importing Components*/
import React, {Component} from 'react';
import GitHubData from "../GitHubData/GitHubData";
import GitLabData from "../GitLabData/GitLabData";

class Results extends Component {
    constructor(props) {
        super(props);
        /* bindings*/
        this.handleClickGitHub=this.handleClickGitHub.bind(this);
        this.handleClickGitLab=this.handleClickGitLab.bind(this);
    }
    /*passing state up
    * both of these events handle the dropdown events of when a user clicks on the respective user boxes*/
    handleClickGitHub(){
        this.props.clickEventGitHub();
    }
    /*passing state up*/
    handleClickGitLab(){
        this.props.clickEventGitLab();
    }

    render() {
        const {items, handleMoreInfoGitHub, handleMoreInfoGitLab} = this.props;
        /*here we render the github and gitlab components and pass down the data accordingly*/
        return (
            <div>
                <GitHubData
                    data={items[0]}
                    clickEventGitHub={this.handleClickGitHub}
                    handleMoreInfoGitHub={handleMoreInfoGitHub}
                />
                <GitLabData
                    data={items[1]}
                    clickEventGitLab={this.handleClickGitLab}
                    handleMoreInfoGitLab={handleMoreInfoGitLab}
                />
            </div>
        );
    }
}

export default Results;