import axios from 'axios';
import { useState } from 'react'
import {
    FormInput,
    FormGroup,
    Button,
    Form,
    Container,
    Segment,
    Header,
} from 'semantic-ui-react'
import { url } from '../url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const SignUp = () => {

    const [email, setEmail] = useState("" as string);
    const [password, setPassword] = useState("" as string)
    const [firstName, setfirstName] = useState("" as string)
    const [lastName, setlastName] = useState("" as string)
    const [isLoading, setisLoading] = useState(false)

    const signIn = async (email: string, password: string, firstName: string, lastName: string) => {

        setisLoading(true)

        await axios
            .post(`${url}/user`,
                {
                    email: email,
                    password: password,
                    firstname: firstName,
                    lastname: lastName
                }
            )
            .then((res) => {

                if (res.data) showToast("User added successfully!")
                setTimeout(() => {
                    window.location.pathname = 'signin'
                }, 3000);
            })
            .catch((err) => {
                if (err?.code == "ERR_BAD_REQUEST") showErrorToast("Email already exist")
                setEmail(" ")
            })
            .finally(() => {
                setisLoading(false);
            });


    }

    const register =(event:any, )=>{
        event.preventDefault()
        signIn(email, password, firstName, lastName);
    }

    const checkInput = () => {
        if (!email.trim() || !password || !firstName.trim() || !lastName.trim()) {
            return true;
        }
    }

    const stripSpace = () => email.trim() && firstName.trim() && lastName.trim()

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const showToast = (msg: string) => toast.success(msg, { position: 'top-right' });
    const showErrorToast = (msg: string) => toast.warn(msg, { position: 'top-right' });

    return (
        <Container textAlign='justified' text>
            <Header textAlign="center" size='huge' style={{paddingTop:"2rem"}}> Register </Header>
            <Segment className="ui black segment">
                <Form >

                    <FormGroup widths={'1'} className='ui two column grid'>
                        <FormInput label='First name' autoComplete="First name" placeholder='First name' onChange={e => { setfirstName(e.target.value), stripSpace() }} />
                        <FormInput label='Last name' autoComplete="Last name" placeholder='Last name' onChange={e => { setlastName(e.target.value), stripSpace() }} />
                    </FormGroup>

                    <FormGroup widths={2} className='ui two column grid'>
                        <FormInput label='Email' autoComplete="email" placeholder='Email' error={!isValidEmail(email)} onChange={e => { setEmail(e.target.value), stripSpace() }} />
                        <FormInput label='Password' autoComplete="current-password" type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </FormGroup>

                    <Container textAlign='justified' className='ui relaxed grid'>
                        <FormGroup className='ui two column grid'>

                            {!isLoading && <Button
                                type='submit'
                                className='ui blue button'
                                disabled={checkInput() || !isValidEmail(email)}
                                onClick={event => register(event)}
                            >Submit</Button>}
                            {isLoading && <button className="ui loading primary button">loading...</button>}
                            <Button
                                type='reset'
                                className='ui red button'
                                onClick={e => window.location.pathname = "/"}
                            >Cancel</Button>
                        </FormGroup>
                    </Container>
                </Form>
            </Segment>


        </Container>
    )
}

