import React, { Component } from 'react';
import ProjectList from '../projects/projectList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component{

    render(){
        //checking if the user is signed in
        const uid = this.props.auth;
        if(!uid) return <Redirect to="/signin" />
        //getting the projects 
        const { projects } = this.props;
        return(
            <div className="dashboard container section">
                <div className="row">
                    <div className="col sm12 m6">
                        <ProjectList projects={projects}/>
                    </div>
                    <div className="col sm12 m5 offset-m1">
                       <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{ 
    return{
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth.uid
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: 'projects' }
    ])
)(Dashboard);
//NOTE:
//Higher order components 
//connect and connectFirebase
//we can use 'compose' from redux to chain them
//compose is both for chaining multiple store enhancers AND Higher order components