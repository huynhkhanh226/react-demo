import React, { Component } from "react";
import logo from "./assets/images/logo.svg";
import { connect } from 'react-redux';
import "@/App.scss";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import { history } from './helpers/index';
import { alertActions } from "./actions/alert.actions";
import getRoutes from './routes/routes';
import RouterView from './routes/RouterView';
import { loading } from './components/Shared/Loading/Loading';
//import RouterView from "react-router-view";
const routes = getRoutes();
// const Login = React.lazy(() => import('./components/LoginPage/LoginPage.jsx'));
// const Home = React.lazy(() => import('./components/HomePage/HomePage.jsx'));


class App extends Component {
    constructor(props) {
        
        super(props);
        debugger;
        
        history.listen((location, action) => {
            console.log("Hello Khanh");
            console.log(location);
            console.log(action);
            console.log(this.props.match.url);
            console.log(this.props.location.pathname);
            this.props.clearAlerts();
        });
    }
    
    render() {
        const { alert } = this.props;
        console.log(alert);
        return (
            <div className="container-fluid">
                 <Router history={history}>
                    <React.Suspense fallback={loading()}>
                    <Switch>
                        <RouterView routes={routes}></RouterView>
                    </Switch>
                    </React.Suspense>
                </Router>
            </div>
        );
    }
}
function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
