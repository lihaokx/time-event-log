 
import { Button,  Label,  Modal,FormText,Form, FormGroup,Input,  ModalHeader, ModalBody} from 'reactstrap';
import React, { useState }  from 'react';
// import { Control, Form, Errors } from 'react-redux-form';
 
const Header = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth')==null?  false :  localStorage.getItem('isAuth'));
    // console.log("localStorage.getItem('userPassword'): ", localStorage.getItem('userPassword') );
    // console.log("localStorage.getItem('userPassword'): ", typeof localStorage.getItem('userPassword'));
    // var curname = localStorage.getItem('userPassword') == null?  '' :    JSON.parse(localStorage.getItem('userPassword'))
    // console.log("curname: ", curname);
    const [username, setUsername] = useState(localStorage.getItem('userPassword') == null?  '' :  JSON.parse(localStorage.getItem('userPassword')).username);

    function toggleModal() {
        setisModalOpen(!isModalOpen);
    }
    function toggleSignUpModal() {
        setIsSignUpModalOpen(!isSignUpModalOpen);
    }

    function handleSignup(event){
        toggleModal();
        console.log("event.target: ", event.target.username.value)
        event.preventDefault();


        var userPassword ={
            "username": event.target.username.value,
            "password": event.target.password.value
        }
        return fetch("http://localhost:3000/users/login" , {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(userPassword)
        })
        .then(response => {
            // the initial response
            console.log("first response: ", response)
            if (response.ok) {

                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            // the initial response converted to a readable response
            console.log("second response: ", response)
            if (response.success) {
                console.log("response: ", response.status)
                // If login was successful, set the token in local storage
                setIsAuth(true);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('token', response.token);
                console.log("userPassword type : ", typeof userPassword)
                localStorage.setItem('userPassword', JSON.stringify(userPassword));
                setUsername(userPassword.username);
                // Dispatch the success action
                // dispatch(fetchFavorites());
                // dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => console.log("Error of posting userPassword: ", error))
    }

    function handleLogin(event) {
        toggleModal();
        console.log("event.target: ", event.target.username.value)
        event.preventDefault();
        var userPassword ={
            "username": event.target.username.value,
            "password": event.target.password.value
        }
        return fetch("http://localhost:3000/users/login" , {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(userPassword)
        })
        .then(response => {
            // the initial response
            console.log("first response: ", response)
            if (response.ok) {

                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            // the initial response converted to a readable response
            console.log("second response: ", response)
            if (response.success) {
                console.log("response: ", response.status)
                // If login was successful, set the token in local storage
                setIsAuth(true);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('token', response.token);
                console.log("userPassword type : ", typeof userPassword)
                localStorage.setItem('userPassword', JSON.stringify(userPassword));
                setUsername(userPassword.username);
                // Dispatch the success action
                // dispatch(fetchFavorites());
                // dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => console.log("Error of posting userPassword: ", error))
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
                </Button>
            </div>
        </div>

        <Modal isOpen={isSignUpModalOpen} toggle={toggleSignUpModal}>
            <ModalHeader toggle={toggleSignUpModal}>Signup</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSignup}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                // innerRef={(input) => this.username = input} />
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password1" name="password1"
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password2" name="password1"
                                />
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