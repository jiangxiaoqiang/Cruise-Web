import React from "react";
import { Route,Switch,BrowserRouter } from 'react-router-dom';
import About from "../about/About";
import Share from "../product/cruise/share/Share";

const routes = (
    <BrowserRouter>        
        <Switch>
          <Route path="/index" exact render={(props) => <App {...props} />}/>
          <Route path="/about" exact render={(props) => <About {...props} />}/>
          <Route path="/product/cruise/share/:id" exact render={(props) => <Share {...props} />}/>
        </Switch>
    </BrowserRouter>
);

export default routes;