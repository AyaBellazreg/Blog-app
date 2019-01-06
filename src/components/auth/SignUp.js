import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

export class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
          })    
      }

      handleSubmit = (e)=>{
          e.preventDefault();
          //console.log(this.state);
          //e.target.reset();
          this.props.signUp(this.state);
      }
  render() {
    //check if user is logged in
    const {auth, signUpStatus} = this.props;
    if(auth) return <Redirect to="/" />

    return (
        <div className="row">
            <div className="container section">
                <form onSubmit={this.handleSubmit}>
                    <h4>Sign Up</h4>

                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" type="text" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" type="text" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn blue darken-3 z-depth-0">Sign Up</button>
                    </div>
                    <div className="center red-text">
                        { signUpStatus ? <p>{signUpStatus}</p> : null }
                    </div>
                </form>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state)=>{   
    return{
        auth: state.firebase.auth.uid,
        signUpStatus: state.auth.signUpStatus
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        signUp: (userInfo)=>{dispatch(signUp(userInfo))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
