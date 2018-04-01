import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Nav extends Component{
    render(){
    const {name} = this.props
    return(
        <div>
            {name}
            <Link to='/dashboard'>
                <h2>Home</h2>
            </Link>
            <Link to='/new'>
                <h2>New Post</h2>
            </Link>
            <Link to='/'>
                <h2>Logout</h2>
            </Link>
        </div>
    )
    }
}

function mapStateToProps(state){
    return(
        {name: state.name}
    )
}

export default connect(mapStateToProps)(Nav)