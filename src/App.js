import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import Header from './components/header/header.component';
import SigninSignupPage from './pages/signin-signup-page/signin-signup-page.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;
  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        //console.log('5', this.state);
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
            //}}, ()=>{console.log('3', this.state);});
          //console.log('4', this.state);
        });
      }
      setCurrentUser(userAuth);
      //this.setState({ currentUser: userAuth }, ()=>{console.log('1', this.state)});
      //console.log('2', this.state);
    });
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SigninSignupPage}/>
        </Switch>
  
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);
