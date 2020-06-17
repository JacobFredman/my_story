import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



class UserInNavBar extends Component {
    logOff = () => {
        window.UserUtils.disconnect();
        // this.props.onGetAuth({ encodedToken: null, USR_LVL_ID: null, USR_NAME: null });
        this.props.history.push({ pathname: '/sign_in' });
        // this.redirectNotConnectedUser();
    }

    // componentDidMount() {
    //     this.redirectNotConnectedUser();
    // }

    // redirectNotConnectedUser = () => {
    //     if (this.props.userName === null && this.props.history.location.pathname !== '/sign_in')
    //         this.props.history.push({ pathname: '/sign_in' });
    // }

    render() {
        let userConnection;
        if (this.props.userName !== null)
            userConnection =
                <React.Fragment>
                    <Navbar.Brand>  {this.props.userName} </Navbar.Brand>
                    <Nav.Link onClick={() => this.logOff()} >התנתק</Nav.Link>
                </React.Fragment>
        else // user not connected
            userConnection =
                <LinkContainer to="/sign_in">
                    <Nav.Link >התחבר</Nav.Link>
                </LinkContainer>

        return (
            <React.Fragment>
                {userConnection}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    state = state.toJS();
    return {
        userName: state.tokenAndDetails.USR_NAME
    };
}

// const mapStateToProps = state => ({ todos: state.todos })


// const mapDispatchToProps = dispatch => {
//     return {
//         onGetAuth: val => dispatch({ type: 'AUTH', val }),
//     };
// };

export default connect(mapStateToProps)(withRouter(UserInNavBar));
// export default connect(mapStateToProps)(UserInNavBar);
