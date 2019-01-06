import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProjectDetails = (props) => {

  const { project,auth } = props;
    //auth
    if(!auth) return <Redirect to="/signin" />
    //loading project details
  if (project){
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  }else{
    return(
            <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
              <h5>Loading project...</h5>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state,ownProps)=>{
  //get the id pf the project
  const id = ownProps.match.params.id;
  //get all the projects inside the firestore
  const projects = state.firestore.data.projects;
  //get the targetted project details
  const project = projects ? projects[id]: null;

  return{
      project,
      auth: state.firebase.auth.uid
    }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails)