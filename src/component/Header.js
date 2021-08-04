 
import { Button,  Label,  Modal,FormText,Form, FormFeedback, FormGroup,Input,  ModalHeader, ModalBody} from 'reactstrap';
import React, { useState , useEffect}  from 'react';
// import { Control, Form, Errors } from 'react-redux-form';
import fetchWithTimeOut from '../helperFunc/fetchWithTimeOut';
// import { options } from 'yargs';
import { baseUrl } from '../shared/url';

const Header = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth')==null?  false :  localStorage.getItem('isAuth'));
    // console.log("localStorage.getItem('userPassword'): ", localStorage.getItem('userPassword') );
    // console.log("localStorage.getItem('userPassword'): ", typeof localStorage.getItem('userPassword'));
    // var curname = localStorage.getItem('userPassword') == null?  '' :    JSON.parse(localStorage.getItem('userPassword'))
    // console.log("curname: ", curname);
    const [username, setUsername] = useState(localStorage.getItem('userPassword') == null?  '' :  JSON.parse(localStorage.getItem('userPassword')).username);
    const [userNameState, setUserNameState] = useState('')
    const [loading, setLoading] = useState({
        login: false,
        signup: false,
        save: false
        })
    const [userPinSignup, setUserPinSignup] =useState({
        username:'',
        password1:'',
        password2:'',
        passwordState: {
            username:'',
            password1:'',
            password2:''
        }
    });
 

    function toggleModal() {
        setisModalOpen(!isModalOpen);
    }
    function toggleSignUpModal() {
        setIsSignUpModalOpen(!isSignUpModalOpen);
        // setPassword('');
        setUserNameState('')
        // setUserPinState('');
        // setUserPinState2('');
    }

    function validUsername(event){
        const target = event.target;
         const value = target.value;
        const name = target.name;
        setUserPinSignup({
            ...userPinSignup,
            [name]: value
        })
 
        if (value.length <3 || value.length >15 ){
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, username: 'no' }
            }});
        }
        else{
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, username: 'yes' }
            }});
        }
        // console.log("userPinSignup: ", userPinSignup)
    }

    function validPassword(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setUserPinSignup({
            ...userPinSignup,
            [name]: value
        });
    }
    
    useEffect(()=>{
        if( userPinSignup.password1 === ""){
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, password1: '' }
            }});
        }
        else if (userPinSignup.password1.length >= 8) {
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, password1: 'yes' }
            }});
        }
        else{
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, password1: 'no' }
            }});
        }
    }, [userPinSignup.password1 ])
    
    useEffect(()=>{
        if( userPinSignup.password2 === ""){
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, password2: '' }
            }});
        }
        else if ( userPinSignup.password1 === userPinSignup.password2){
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, password2: 'yes' }
            }});
 
        }
        else{
            setUserPinSignup(
                (userPinSignup) => { return { ...userPinSignup, passwordState: {...userPinSignup.passwordState, password2: 'no' }
            }});
        }
    }, [userPinSignup.password1,  userPinSignup.password2 ])

    // console.log("userPinSignup: ", userPinSignup)
    function handleSignup(event){
        // toggleSignUpModal();
        // console.log("event.target: ", event.target.username.value)
        setLoading(
            (loading) => {return {...loading, signup:true}}
        )
        event.preventDefault();

        if(userPinSignup.passwordState.password1 == 'yes' && userPinSignup.passwordState.password2 == 'yes' && userPinSignup.passwordState.username == 'yes'){
            toggleSignUpModal()
            var userPassword ={
                "username": userPinSignup.username,
                "password": userPinSignup.password1
            }
            return fetchWithTimeOut(baseUrl + "users/signup", {
                method: 'POST',
                headers: { 
                    'Content-Type':'application/json' 
                },
                body: JSON.stringify(userPassword)
            }, 10000)
            .then(response => response.json(), error => {throw error; })
            .then(response => {
                // the initial response converted to a readable response
                // console.log("second response: ", response)
                if (response.success) {
                    setLoading(
                        (loading) => {return {...loading, signup:false}}
                    )
                    // console.log("response: ", response.status)
                    alert(response.status)
                }
                else {
                    var error = new Error( response.status);
                    error.response = response;
                    throw error;
                }
            })
            .catch(error => {console.log("Error of posting userPassword: ", error);
            setLoading(
                (loading) => {return {...loading, signup:false}}
            )
            alert(error)
            })
        }
        else{
            
            alert("Your username or password are invalid. \nYou can not register! ")
        }

    }

    function handleLogin(event) {
        toggleModal();
        // console.log("event.target: ", event.target.username.value)
        event.preventDefault();
        setLoading(
            (loading) => {return {...loading, login:true}}
        )
        var userPassword ={
            "username": event.target.username.value,
            "password": event.target.password.value
        }
        return fetchWithTimeOut(baseUrl +"users/login" , {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(userPassword)
        }, 10000)
        .then(response => response.json())
        .then(response => {
            // the initial response converted to a readable response
            // console.log("second response: ", response)
            if (response.success) {
                // If login was successful, set the token in local storage
                setIsAuth(true);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('token', response.token);
                // console.log("userPassword type : ", typeof userPassword)
                localStorage.setItem('userPassword', JSON.stringify(userPassword));
                setUsername(userPassword.username);
                alert( response.status)
                setLoading(
                    (loading) => {return {...loading, login:false}}
                )
            }
            else {
                var error = new Error(response.err.message);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {
            // console.log("Error of posting userPassword: ", error);
                setLoading(
                    (loading) => {return {...loading, login:false}}
                );
                alert(error   )}
        )
    }
 

    function handleLogout(){
        localStorage.removeItem('token');

        localStorage.removeItem('isAuth');
        localStorage.removeItem('userPassword');
        setIsAuth(false);
    }

    return ( 
    <React.Fragment>
        <div className="row   justify-content-end">
 
            <div  className="col-md-3 dateInput "> 
               { !isAuth? 
                <Button outline className="loginBtn" onClick={toggleModal}>
                    <span className="fa fa-sign-in fa-lg "></span> Login
                    {loading.login? 
                        <i className="fa fa-spinner fa-pulse fa-fw"></i>  : null}
                </Button>
                :
                <div>
        
                    <Button outline className="loginBtn col-8" onClick={handleLogout}>
                    {username} <span className="fa fa-sign-in fa-lg "></span> Logout
                    </Button>
                </div>
                }
            </div>      
            <div  className="col-md-2 dateInput "> 
                <Button outline className="loginBtn" onClick={toggleSignUpModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Signup
                    {loading.signup? 
                        <i className="fa fa-spinner fa-pulse fa-fw"></i>  : null}

                </Button>
            </div>
        </div>

        <Modal isOpen={isSignUpModalOpen} toggle={toggleSignUpModal}>
            <ModalHeader toggle={toggleSignUpModal}>Signup</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSignup}>
                        <FormGroup>
                            <Label htmlFor="username">Username {userPinSignup.username}</Label>
                            <Input type="text" id="username" name="username"
                             placeholder="Your username"
                             valid={userPinSignup.passwordState.username == "yes"}
                             invalid={ userPinSignup.passwordState.username == "no"}
                             onChange={(e) => {
                               validUsername(e);
                             }}  />
                            <FormFeedback>
                             Length of username should be no less than 3 or no larger than 15!
                            </FormFeedback>

                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password1">Password {userPinSignup.password1} </Label>
                            <Input type="password" id="password1" name="password1"
                             valid={userPinSignup.passwordState.password1 == "yes"}
                             invalid={ userPinSignup.passwordState.password1 == "no"}
                             onChange={(e) => {
                               validPassword(e);
                             }}      />
                            <FormFeedback>
                             Length of password should be more than 8!
                            </FormFeedback>

                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password2">Confirm Password {userPinSignup.password2}</Label>
                            <Input type="password" id="password2" name="password2"
                            valid={userPinSignup.passwordState.password2 == "yes"}
                            invalid={ userPinSignup.passwordState.password2 == "no"}
                            onChange={(e) => {
                            validPassword(e);
                            }} />
                            <FormFeedback>
                            Two password should be the same!
                            </FormFeedback>

                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Signup</Button>
                    </Form>
                </ModalBody>
        </Modal>

        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                // innerRef={(input) => this.username = input} />
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
        </Modal>
    </React.Fragment>

     );
}
 
export default Header;