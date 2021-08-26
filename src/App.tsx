import { Component } from "react";
import { Route, } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MainPage from "./components/mainPage";

class App extends Component {
  render() {
    return (
      <div>
            <Route exact path={["/",  ]} component={MainPage} />
        </div>
    );
  }
}

export default App;
