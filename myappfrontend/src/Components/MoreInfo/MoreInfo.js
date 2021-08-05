import React, {Component} from 'react';
import "./moreInfo.css";
/*this component generates a neat representation of all repos one by one*/
class MoreInfo extends Component {
    render() {
        const {gitLabData} = this.props;
        return (
            <div className="repo-container">
                <ul>
                    <li>Repo Name : {gitLabData.repoName}</li>
                    <li>Repo Description : {gitLabData.repoDescription ? (gitLabData.repoDescription) : "none"}</li>
                    <li>Repo Created : {gitLabData.repoCreated.substr(0, 10)}</li>
                    <li>Repo Updated : {gitLabData.repoUpdated.substr(0, 10)}</li>
                    <li>
                        Repo URL :
                        <a href={gitLabData.repoURL}> {gitLabData.repoURL}</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MoreInfo;