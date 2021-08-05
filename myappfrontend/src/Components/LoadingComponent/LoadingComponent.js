import React, {Component} from 'react';
import loadingImage from '../../Eclipse-0.6s-203px.gif';
import './loadingStyles.css';
/*simply a gif used to show loading*/
class LoadingComponent extends Component {
    render() {
        return (
            <div className="loading-container">
                <img src={loadingImage} alt=""/>
            </div>
        );
    }
}

export default LoadingComponent;