import axios from 'axios';
import { useState } from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import { url } from '../url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SignIn = () => {

  const [email, setEmail] = useState("" as string);
  const [password, setPassword] = useState("" as string)
  const [isLoading, setisLoading] = useState(false)

  const login = async (email: string, password: string) => {

    setisLoading(true)

    await axios
      .post(`${url}/login`, { email: email, password: password })
      .then((res) => {

        if (res?.data)
          localStorage.setItem("userAuth", JSON.stringify(res?.data?.data))
        window.location.pathname = 'dashboard'

      })
      .catch((err) => {
        if (err?.code == 'ERR_BAD_REQUEST') showToastMsg(" incorrect email or password")
      })
      .finally(() => {
        setisLoading(false);
      });


  }

  const connection =(event:any, )=>{
    event.preventDefault()
    login(email,password)
  }
  const showToastMsg = (msg: string) => toast.error(msg, { position: 'top-right' });
  const stripSpace = () => email.trim();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const checkInput = () => {
    if (!email.trim() || !password) {
      return true;
    }
  }

  return (
    <Container textAlign='justified' text>

      <Header textAlign="center" size='huge' style={{paddingTop:"2rem"}}> Login </Header>

      <form >
        <div className="ui form segment ui black segment">
          <div className="field">
            <label>Email</label>
            <div className="ui left labeled icon input">
              <input
                type="email"
                autoComplete='Email'
                placeholder="Email"
                onChange={e => {
                  setEmail(e.target.value),
                    isValidEmail(e.target.value),
                    stripSpace()
                }}
              />
              <div className="ui corner label">
                <i className="icon asterisk"></i>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui left labeled icon input">
              <input
                type="password"
                autoComplete="Password"
                onChange={e => setPassword(e.target.value)}
              />
              <div className="ui corner label">
                <i className="icon asterisk"></i>
              </div>
            </div>
          </div>
          {!isLoading && <Button
            type='submit'
            className='ui blue button'
            disabled={checkInput() || !isValidEmail(email)}
            onClick={event => connection(event)}
          >Submit</Button>}
          {isLoading && <button className="ui loading primary button">loading...</button>}
          <Button
            type='reset'
            className='ui red button'
            onClick={e => window.location.pathname = "/"}
          >Cancel</Button>

        </div>
      </form>

    </Container>

  )
}

