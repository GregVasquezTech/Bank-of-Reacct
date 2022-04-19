import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <img src="https://picsum.photos/200/200" alt="bank" />
                <h1><b>Bank of React</b></h1>

                <Link to="/userProfile">User Profile</Link>
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/debit">Debit</Link>
                <br/>
                <Link to="/credit">Credit</Link>

                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Home;