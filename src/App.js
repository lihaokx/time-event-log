 
import './App.css';
import  Header from "./component/Header.js";
import EventRow from './component/EventRow';
import DateComponent from './component/DateComponent';
import { Provider } from 'react-redux';
import  {ConfigureStore} from './reduxReducer/configureStore';
import Footer from "./component/Footer";

const store = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <div className="container">
            <DateComponent />
            <br></br>
            <Header/>
            <EventRow/>
            
          </div>
        </div>
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;
