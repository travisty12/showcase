import './App.css';
import Header from './Header';
import Home from "./Home";
import Portfolio from "./Portfolio";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ChatBot from "./ChatBot";
import ChatBox from "./ChatBox";
import { AuthRoute, ProtectedRoute } from "../util/route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="Body">
          <Switch>
            <AuthRoute path="/signin" component={SignIn} />
            <AuthRoute path="/signup" component={SignUp} />
            <ProtectedRoute path="/profile/:username" component={Profile} />
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/chatbot">
              <ChatBot />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <ChatBox />
      </Router>
    </div>
  );
}

export default App;
