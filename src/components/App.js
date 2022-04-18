import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import UserProfile from './UserProfile';
import LogIn from './Login'
import Debits from './Debit';
import Credits from './Credit';


class App extends Component {
  constructor() {
    super();
    let todayDate = new Date().toISOString().slice(0,10)
    this.state = {
      accountBalance: 0,
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

  //Calling the two API to update balance.
  async componentDidMount() {
    const debitAPI = async () => {
      const response = await fetch("https://moj-api.herokuapp.com/debits") // Calling the debit API JSON that will subtract from the user's account balance.
      const debits = await response.json() // replacing the JSON into JS object and putting it into the variable debits.
      this.setState({debits: debits}) // Updating the debits array to the newly object.
      
      let sumOfDebit = debits.map((debit) => { // Summing up all the debit amount from the API and subtracting it from the user's account balance.
        return this.setState({accountBalance: this.state.accountBalance - debit.amount})
      })
     return sumOfDebit 
    }

    const creditAPI = async () => {
      const response = await fetch("https://moj-api.herokuapp.com/credits") // Calling the credit API JSON that will add to the user's account balance.
      const credits = await response.json()
      this.setState({credits: credits})

      let sumOfCredit = credits.map((credit) => {
        return this.setState({accountBalance: this.state.accountBalance + credit.amount})
      })
      return sumOfCredit
    }
    debitAPI()
    creditAPI()
  }

  addDebit = (e) => {
    e.preventDefault()
    let todayDate = new Date().toISOString().slice(0,10)
    let newDebit = {
      description: e.target[0].value,
      amount: Number(e.target[1].value),
      date: String(todayDate)
    }
    let updateDebit = this.state.debits
    updateDebit.push(newDebit)
    let newBalance = (Number(this.state.accountBalance) - (Number(newDebit.amount)))
    this.setState({debits: updateDebit, accountBalance: newBalance})

    e.target.description.value = ""
    e.target.amount.value = ""
  }

  addCredit = (e) => {
    e.preventDefault()
    let todayDate = new Date().toISOString().slice(0,10)
    let newCredit = {
      description: e.target[0].value,
      amount: Number(e.target[1].value),
      date: String(todayDate)
    }
    let updateCredit = this.state.credits
    updateCredit.push(newCredit)
    let newBalance = (Number(this.state.accountBalance) + (Number(newCredit.amount)))
    this.setState({credts: updateCredit, accountBalance: newBalance})

    e.target.description.value = ""
    e.target.amount.value = ""
  }
  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>)
    
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn}/>) //Pass props to "LogIn" component
    
    const DebitsComponent =() => (<Debits addDebit={this.addDebit} debits={this.state.debits} accountBalance={this.state.accountBalance}/>)

    const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={this.state.credits} accountBalance={this.state.accountBalance}/>)
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path ="/credits" render={CreditsComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
