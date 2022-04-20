import React, { useState } from 'react';
import AccountBalance from './AccountBalance';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';

export default function Home() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const accountBalance = useState()

    function handleLogout() {
        setError('')

        try {
            logout()
            history.push('/login')
        } catch {
            setError('Failed to logout.')
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Home</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                    <AccountBalance accountBalance={accountBalance} />
                    <Link to="/userProfile" className='btn btn-primary w-100 mt-3'>
                        User Profile
                    </Link>
                    <br/>
                    <Link to="/debit" className='btn btn-primary w-100 mt-3'>
                        Debit
                    </Link>
                    <br/>
                    <Link to="/credit" className='btn btn-primary w-100 mt-3'>
                        Credit
                    </Link>
                    <br/>
                    
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
            </div>
        </>
    );
}
