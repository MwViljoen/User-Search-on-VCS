/*This component works similar to GitHubData Component and will not have any comments
* read the GitHubData to understand this component*/

import React, {Component} from 'react';
import './gitLabDataStyles.css';
import MoreInfo from "../MoreInfo/MoreInfo";

class GitLabData extends Component {
    constructor(props) {
        super(props);
        this.handleClickGitLab=this.handleClickGitLab.bind(this);
    }

    handleClickGitLab(){
        this.props.clickEventGitLab();
    }

    render() {
        const {data, handleMoreInfoGitLab} = this.props;
        const gitLabDataArray = data[0].repoInfo;
        if (data[0] !== `Username not found`){
            return (
                <div className="results-container" >
                    <h2>GitLab Results</h2>
                    <div className="results-wrapper" onClick={this.handleClickGitLab}>
                        <div className="results-image">
                            <img src={data[0].userInfo.profileImg} alt=''/>
                        </div>
                        <div className="results-userInfo">
                            <ul>
                                <li>
                                    <i>Username : </i> {data[0].userInfo.userName}
                                </li>
                                <li><i>Bio: </i> {data[0].userInfo.gitBio ? data[0].userInfo.gitBio : `None`}</li>
                                <li>
                                    <i>Git Profile: </i>
                                    <a href={data[0].userInfo.gitProfileLink} className="external-tag">
                                        GitLab Profile Link
                                    </a>
                                </li>
                                <li><i>Public Repositories: </i> {(data[0].repoInfo).length} </li>
                                <li><i>Joined: </i>
                                    {(data[0].userInfo.createdOn) ?
                                        (data[0].userInfo.createdOn).substr(0, 10)  :
                                        'Not Specified'
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {handleMoreInfoGitLab ?
                            (<div className="results-more">
                                <h2>More</h2>
                                {gitLabDataArray.map((gitLabData, index) =>
                                    <MoreInfo key={index}
                                              gitLabData={gitLabData}
                                    />
                                )}
                            </div>)
                            :
                            <p>None</p>
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

export default GitLabData;