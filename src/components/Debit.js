import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";
import {Form, Card, Button} from "react-bootstrap";

const Debits = (props) => {
	let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}> {debit.amount} {debit.description} {date}</li>
    }) 
  }

  
  return (
    <div>
      <Card>
        <h1>Debit</h1>
        <form onSubmit={props.addDebit}>
          <AccountBalance accountBalance = {props.accountBalance}/>
          {debitsView()}
            <input type="text" name="description" placeholder="description"/>
            <input type="number" name="amount" placeholder="amount"/>
            <button type="submit">Add Debit</button>
        </form>
      </Card>
      <div>
          <Link to="/">Home</Link>
          <br/>
          <Link to="/userProfile">User Profile</Link>
          <br/>
          <Link to="/credit">Credits</Link>
          <br/>
          <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Debits;