import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedIn'
import SignedOutLinks from './SignedOut'
import { connect } from 'react-redux'

const Navbar = (props) => {

  const links = props.logStatus.uid ? <SignedInLinks profile={props.profile} /> : <SignedOutLinks /> ;
  //console.log(props);
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Blogs</Link>
        { links }
      </div>
    </nav>
  )
}

const mapStateToProps = (state)=>{
 
  return{
    logStatus: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)