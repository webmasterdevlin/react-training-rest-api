import React from 'react';
import { Router, Redirect } from "@reach/router";

import MemberList from './components/MemberList'
import Profile from './components/Profile'

const RootRouter = () => (
    <Router>
        <Redirect from="/" to="member-list" noThrow /> 

         <Profile path="edit-member/:id" />
         <Profile path="edit-member" />
         <MemberList path="member-list" />
    </Router>
);

export default RootRouter