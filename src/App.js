import "./App.css";
import React, {  useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=> {
  const [progress,setprogress]=useState(0)

  

  
    return (
      <Router>
      <div>
        <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
        
        <Switch>
          <Route key="Business" path="/Business">
          <News setprogress={setprogress} pagesize={8} country="in" category="business"/>
          </Route>
          <Route key="entertainment" path="/Entertainment">
          <News setprogress={setprogress} pagesize={8} country="in" category="entertainment"/>
          </Route>
          <Route key="health" path="/Generalhealth">
          <News setprogress={setprogress} pagesize={8} country="in" category="health"/>
          </Route>
          <Route key="Science" path="/Science">
          <News setprogress={setprogress} pagesize={8} country="in" category="science"/>
          </Route>
          <Route key="Sports" path="/Sports">
          <News setprogress={setprogress} pagesize={8} country="in" category="sports"/>
          </Route>
          <Route key="technology" path="/Technology">
          <News setprogress={setprogress} pagesize={8} country="in" category="technology"/>
          </Route>
          <Route key="general" path="/">
          <News setprogress={setprogress} pagesize={8} country="in" category="general"/>
          </Route>
        </Switch>
      </div>
       </Router>
    );
  
}

export default App;