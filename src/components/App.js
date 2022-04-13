import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import UserProfile from './UserProfile';
import LogIn from './Login'
import Debits from './Debit';

class App extends Component {
  constructor() {
    super();
    let todayDate = new Date().toISOString().slice(0,10)
    this.state = {
      accountBalance: 14568.27,
      description: '',
      debits: [],
      credits: [],
      currentUser: {
        userName: 'John Doe',
        memberSince: String(todayDate)
      }
    }
  }

  mockLogIn =(logInInfo) => { // Update state's currentUser (userName) after "Log In" button is clicked
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // This is getting data from a JSON website. 
  async componentDidMount() {
    let debitAPI = await axios.get("https://moj-api.herokuapp.com/debits")
    console.log(debitAPI.data)
    let creditAPI = await axios.get('https://moj-api.herokuapp.com/credits')
    console.log(creditAPI.data)

    // Creating variables that only holds the 'description', 'amount', and 'date' from the JSON websites.
    let debits = debitAPI.data
    let credits = creditAPI.data

  
    let totalDebit, totalCredit = 0; // Creating variables that will hold the total amount on debit/credit.
    debits.forEach((debit) => {
      totalDebit = totalDebit + debit.amount
    })
    credits.forEach((credit) => {
      totalCredit = totalCredit + credit.amount
    })

    let newBalance =  totalCredit - totalDebit // Updates the accountBalance 
    this.setState({debits, credits, newBalance})
  }

  addDebit = (e) => {
    e.preventDefault()
    let todayDate = new Date().toISOString().slice(0,10)
    let newDebit = {
      description: e.target[0].value,
      amount: Number(e.target[1].value),
      date: String(todayDate)
    }
    let updateDebit = [...this.state.debits]
    updateDebit.push(newDebit)
    let newBalance = (Number(this.state.accountBalance) - (Number(newDebit.amount)).toFixed(2))
    this.setState({accountBalance: newBalance})
    this.setState({debits: newDebit})
  }
  render() {
    const {debits} = this.state;
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn}/>) //Pass props to "LogIn" component
    
    const DebitsComponent =() => (<Debits addDebit={this.addDebit} debits={debits} accountBalance={this.state.accountBalance}/>)

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
