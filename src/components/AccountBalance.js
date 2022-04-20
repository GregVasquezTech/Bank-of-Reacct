import React, {Component} from "react";

class AccountBalance extends Component {
    render() {
        return (
            <div>
                <b>
                Account Balance: $ {Math.round(this.props.accountBalance * 100) / 100}
                </b>
            </div>
        );
    }
}

export default AccountBalance;