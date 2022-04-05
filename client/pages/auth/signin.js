import { useState } from "react"
import UseRequest from './../../hooks/use-request';
import Router from 'next/router';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = UseRequest({
        url: '/api/users/signIn',
        method: 'post',
        body: {email, password},
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In Form</h1>
            <div className="form-group">
                <label>Email:</label>
                <input 
                    className="form-control" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input 
                    className="form-control"
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}/>
            </div>

            {errors}
            
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}