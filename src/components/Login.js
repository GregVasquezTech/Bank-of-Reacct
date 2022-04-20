// import React, {Component} from "react";
// import { Redirect } from "react-router-dom"

// class LogIn extends Component {
//     constructor () { // Create and initialize state
//         super()
//         this.state = {
//             user: {
//                 userName: '',
//                 password: '',
//             },
//             redirect: false
//         }
//     }

//     //When the user name input is changed, capture the input and update the state (user.userName)
//     handleChange = (e) => {
//         const updatedUser = {...this.state.user}
//         const inputField = e.target.name
//         const inputValue = e.target.value 
//         updatedUser[inputField] = inputValue

//         this.setState({user: updatedUser})
//     }

//     // When user clicked "Log in" button, store user data and then redirect to "User Profile" page
//     handleSubmit = (e) => {
//         e.preventDefault()
//         this.props.mockLogIn(this.state.user)
//         this.setState({redirect: true})
//     }
//     render() {
//         if (this.state.redirect) { // Redirect to "User Profile" page when "Log In" button is clicked
//             return(<Redirect to="/userProfile"/>)
//         }
//         // Render the login form
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <div>
//                         <label htmlFor="userName">User Name</label>
//                         <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName}/>
//                     </div>
//                     <div>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" name="password"/>
//                     </div>
//                     <button>Log In</button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default LogIn;

import React, { useRef, useState } from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()


        try {
           setError("")
           setLoading(true)
           await login(emailRef.current.value, passwordRef.current.value)
           history.push("/")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Submit</Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to="/forgotPassword">Forgot password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup"><Button className="w-100">Signup</Button></Link>
        </div>
    </>
    )
}