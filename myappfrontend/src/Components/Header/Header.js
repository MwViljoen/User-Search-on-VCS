import React, {Component} from 'react';
import './headerStyles.css';
/*generating a header*/
class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <h1>Search by Username on GitHub and GitLab</h1>
            </div>
        );
    }
}

export default Header;