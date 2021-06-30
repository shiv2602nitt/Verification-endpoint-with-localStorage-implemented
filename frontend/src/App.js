import HomePage  from "./Pages/HomePage";
import SelectTimePage  from "./Pages/SelectTimePage";
import VerifyPage from "./Pages/VerifyPage"
import './App.css';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/selectTime" component={SelectTimePage} exact/>
        <Route path="/verify" component={VerifyPage} exact/>
      </Switch>
    </Router>
  );
}


export default App;
