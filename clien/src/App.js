import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import { ContextProvider } from "./context/auth";

import MenuNav from "./layouts/MenuNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Container>
          <MenuNav />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </ContextProvider>
  );
}

export default App;
