import React, {useState} from "react";
import {login} from "../Api/authApi";
import Alert from 'react-bootstrap/Alert'

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [incorrect, setIncorrect] = useState(false);

    async function handleChange() {
        if (email && pass) {

            try {
                await login(email, pass).then((data) => {
                    if (!data) {
                        setIncorrect(true);
                    } else {
                        localStorage.setItem('token', data.token);
                        window.location = '/admin';
                    }
                })
            } catch (e) {
                setError(false);
                setIncorrect(true);
            }

        } else {
            setError(true)
        }
    }

    return (
        <section className={'intro'}>
            <div className={'contact-inp'}>
                <div className={'inputs'}>
                    <label>Login</label>
                    <input type="text" placeholder={'Email'} value={email}
                           onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className={'inputs'}>
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={pass}
                           onChange={(e) => setPass(e.target.value)} required/>
                </div>
                <div className="end">
                    <button onClick={handleChange}>Send</button>
                </div>
                {error === true &&
                    <Alert key={'danger'} variant={'danger'} style={{marginTop: '20px', fontSize: '15px'}}>
                        Please fill all fields!
                    </Alert>
                }
                {incorrect === true &&
                    <Alert key={'danger'} variant={'danger'} style={{marginTop: '20px', fontSize: '15px'}}>
                        Username or Password is incorrect!
                    </Alert>
                }
            </div>
        </section>

    );
}

export default Login;