import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Nav from "./components/NavBar";
import About from "./components/About";
import Help from "./components/Help";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import withAuth from "./components/withAuth";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/about" />
          <Route exact path="/about" component={About} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/app" component={withAuth(MainApp)} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
