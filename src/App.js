 
import './App.css';
 
import EventRow from './component/EventRow';
import Header from './component/Header';
import { Provider } from 'react-redux';
import  {ConfigureStore} from './reduxReducer/configureStore';
import Footer from "./component/Footer";
import { PersistGate } from 'redux-persist/integration/react'
 
const store = ConfigureStore().store;
const persistor = ConfigureStore().persistor;
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <div className="App-header">
            <div className="container">
              <Header />
              <br></br>
 
              <EventRow/>
              
            </div>
          </div>
          <Footer/>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
