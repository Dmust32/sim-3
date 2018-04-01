import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUsername, updatePassword} from '../redux/reducer'

class Auth extends Component {
    render(){
        const {updatePassword, updateUsername} = this.props
        return(
            <div>
                {/* <h2>Username:</h2>
                    <input onChange={(e)=>updateUsername(e.target.value)}></input>
                <h2>Password</h2>
                    <input onChange={(e)=>updatePassword(e.target.value)}></input>
                <button>Login</button>
                <button>Register</button> */}
                <a href="http://localhost:5050/auth"><button>Login</button></a>
            </div>
        )
    }
}
function mapStateToProps(state){
    return(
        {}
    )
}


export default connect(mapStateToProps, {updateUsername, updatePassword}) (Auth)