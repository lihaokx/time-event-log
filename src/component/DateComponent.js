import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const DateComponent = () => {
    return ( 
        <div className="row justify-content-center">
            <h4>Date of Today</h4>
            <br></br>
            <div  className="col-2 dateInput"> 
            <Form>
                <FormGroup>

                    <Input type= "date" id="todayDate" name="todayDate"/>
                
                </FormGroup>
            </Form>
            </div>
        </div>

     );
}
 
export default DateComponent;