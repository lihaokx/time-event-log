import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody} from 'reactstrap';
import React, { useState }  from 'react';
 
const DateComponent = () => {
    const [isModalOpen, setisModalOpen] = useState(false);

    function toggleModal() {
        setisModalOpen(!isModalOpen);
    }

    function handleLogin(event) {
        toggleModal();
        // this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    return ( 
    <React.Fragment>
        <div className="row   justify-content-end">
            <h4 className="mt-5">Date of Today</h4>
            <br></br>
            <div  className="col-md-4 dateInput  "> 
                <Form>
                    <FormGroup>
                        <Input type= "date" id="todayDate" name="todayDate"/>
                    </FormGroup>
                </Form>
            </div>
            <div  className="col-md-2 dateInput "> 
                <Button outline className="loginBtn" onClick={toggleModal}>
                    <span className="fa fa-sign-in fa-lg "></span> Login
                </Button>
            </div>      
            <div  className="col-md-2 dateInput "> 
                <Button outline className="loginBtn" onClick={toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Signup
                </Button>
            </div>  

        </div>

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
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                               />
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
        </Modal>
    </React.Fragment>

     );
}
 
export default DateComponent;