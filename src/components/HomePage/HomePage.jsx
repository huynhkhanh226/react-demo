import React, { Suspense } from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import './HomePage.scss';
import W00F1000 from '../W0X/W00/W00F1000/W00F1000';
import RouterView from '../../routes/RouterView';
//import RouterView from "react-router-view";
//import routes from '../../routes/routes';
import {FormGroup, Row, Col} from 'reactstrap';
import MainMenu from './MainMenu.jsx';
import TopMenu from './TopMenu.jsx';
import Footer from '../Shared/Footer/Footer.jsx';
import { loading } from '../Shared/Loading/Loading';
// const MainMenu = React.lazy(() => import( /* webpackChunkName: "MainMenu" */'./MainMenu.jsx'));
// const TopMenu = React.lazy(() => import( /* webpackChunkName: "TopMenu" */'./TopMenu.jsx'));
// const Header = React.lazy(() => import( /* webpackChunkName: "Header" */'./Header.jsx'));
// const EssMenu = React.lazy(() => import( /* webpackChunkName: "EssMenu" */'./EssMenu.jsx'));
// const Footer = React.lazy(() => import( /* webpackChunkName: "Footer" */'../Shared/Footer/Footer.jsx'));



class HomePage extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      };
    };
    
    componentDidMount(){
      
    }
    render() {
      debugger;
        //var redirect = '' 
        //const {user} = this.props;
        console.log("loggingIn" + this.props.loggedIn);
        return (
            <div className={"home-page"}>
             
              <Router>
                  { this.props.loggedIn && (
                    <Suspense fallback={loading()}>
                       <TopMenu />
                    </Suspense>)
                  }
                  { this.props.loggedIn && (
                    <Suspense fallback={loading()}>
                       <MainMenu />
                    </Suspense>)
                  }
                 
                 <Suspense fallback={loading()}>
                    <div className={"main-body"}>
                      <FormGroup>
                          <Row>
                            <Col sm={12}>
                              <RouterView name="a" routes={this.props.childRoutes}/>
                            </Col>
                          </Row>
                      </FormGroup>
                    </div>
                 </Suspense> 
              </Router>
            </div>

        );
    }
}

function mapState(state) {
    const { loggedIn, user } = state.authentication;
    return {loggedIn, user};
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const Home = connect(mapState, actionCreators)(HomePage);
// export {
//     connectedHomePage as HomePage
// };

export default Home
