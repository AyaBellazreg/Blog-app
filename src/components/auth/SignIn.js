import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

export class SignIn extends Component {

    state = {
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
          this.props.signIn(this.state);
      }

  render() {
    const {auth,authError }= this.props;
    if(auth) return <Redirect to="/" />

    return (
        <div className="row">
            <div className="container section">
                <form onSubmit={this.handleSubmit}>
                    <h4>Sign In</h4>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn blue darken-3 z-depth-0">Sign In</button>
                    </div>
                    <div className="center red-text">
                        { authError ? <p>{authError}</p> : null}
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
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signIn : (cords)=>{dispatch(signIn(cords))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
