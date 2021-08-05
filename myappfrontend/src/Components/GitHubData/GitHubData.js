import React, {Component} from 'react';
import './gitHubDataStyles.css';
import MoreInfo from "../MoreInfo/MoreInfo";

class GitHubData extends Component {
    constructor(props) {
        super(props);
        /*binding handler*/
        this.handleClickGitHub=this.handleClickGitHub.bind(this);
    }
    /*handler for dropdown and lifting state up*/
    handleClickGitHub(){
        this.props.clickEventGitHub();
    }
    /* this render  renders the user information
    * for github that was sent to react from express
    * On line 45 we send the data of the repo to the next component that handles the rest
    * we use the map method to generate a component of each array index which represents a repository
    * if the repository array is empty the user found on github has no repos or has no public repos
    * and we simply render that
    * if the data returnd has a string of Username not found
    * then express did not receive any info regarding the user from the API/VCS and then we simply just render that
    * */
    render() {
        const {data, handleMoreInfoGitHub} = this.props;
        const gitHubDataArray = data[0].repoInfo;
        if (data[0] !== `Username not found`){
            return (
                <div className="results-container">
                    <h2>GitHub Results</h2>
                    <div className="results-wrapper" onClick={this.handleClickGitHub}>
                        <div className="results-image">
                            <img src={data[0].userInfo.profileImg} alt=''/>
                        </div>
                        <div className="results-userInfo">
                            <ul>
                                <li><i>Username : </i> {data[0].userInfo.userName} </li>
                                <li><i>Bio: </i> {data[0].userInfo.gitBio ? data[0].userInfo.gitBio : `None`}</li>
                                <li>
                                    <i>Git Profile: </i>
                                    <a href={data[0].userInfo.gitProfileLink} className="external-tag">
                                        GitHub Profile Link
                                    </a>
                                </li>
                                <li><i>Public Repositories: </i> {(data[0].repoInfo).length} </li>
                                <li><i>Joined: </i> {(data[0].userInfo.createdOn).substr(0, 10)} </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {handleMoreInfoGitHub ?
                            (<div className="results-more">
                                <h2>More</h2>
                                {gitHubDataArray.map((gitHubData, index) =>
                                    <MoreInfo key={index + 50}
                                              gitLabData={gitHubData}
                                    />
                                )}
                            </div>)
                            :
                            <p>Click user to open Repos</p>
                        }
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="results-container">
                    <h2>GitLab Results</h2>
                    <div className="results-wrapper">
                        <div className="results-userInfo">
                            <p>User not found</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default GitHubData;