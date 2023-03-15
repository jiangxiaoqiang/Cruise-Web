import React from "react";
import { Route,Switch,BrowserRouter } from 'react-router-dom';
import About from "../product/cruise/about/About";
import Share from "../product/cruise/share/Share";
import Index from '../product/cruise/index/Index.tsx';
import PaySuccess from "../product/pay/success/PaySuccess";

const routes = (
    <BrowserRouter>        
        <Switch>
          <Route path="/" exact render={(props) => <Index {...props} />}/>
          <Route path="/about" exact render={(props) => <About {...props} />}/>
          <Route path="/product/cruise/share/:id" exact render={(props) => <Share {...props} />}/>
          <Route path="/product/pay/success" exact render={(props) => <PaySuccess {...props} />}/>
        </Switch>
    </BrowserRouter>
);

export default routes;