import React from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

const Credits = (props) => {
	let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    }) 
  }
  return (
    <div>
      <h1>Credit</h1>
      <form onSubmit={props.addCredit}>
      <AccountBalance accountBalance = {props.accountBalance}/>
      {creditsView()}
        <input type="text" name="description" placeholder="description"/>
        <input type="number" name="amount" placeholder="amount"/>
        <button type="submit">Add Credit</button>
      </form>
      <div>
          <Link to="/">Home</Link>
          <br/>
          <Link to="/userProfile">User Profile</Link>
          <br/>
          <Link to="/debit">Debits</Link>
          <br/>
          <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Credits;