import React from 'react';
import Signin from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';
import './signin-signup-page.styles.scss';

const SigninSignupPage = () => (
    <div className='signin-signup'>
        <Signin />
        <SignUp />
    </div>
);

export default SigninSignupPage;