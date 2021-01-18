import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import User from '../components/user/UserInNavBar';
import { withRouter } from 'react-router-dom';
import { baseUrl } from '../utils/StaticData';
import { connect } from 'react-redux';






class NavBarBootStrap extends Component {
    render() {
        return (<Navbar dir='rtl' bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>לוקחים אחריות</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    this.props.is_admin
                        ?
                        <NavDropdown title="ניהול המערכת" id="collasible-nav-dropdown">
                            <LinkContainer to="/admin/cups_and_points">
                                <NavDropdown.Item >גביעים ונקודות</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/feedback_text">
                                <NavDropdown.Item >טקסט משוב</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/users_statistics">
                                <NavDropdown.Item >נתוני משתמשים</NavDropdown.Item>
                            </LinkContainer>
                            <div onClick={() => window.open(baseUrl + "admin/user_statistics.csv", "_blank")}>
                                <NavDropdown.Item >נתוני משתמשים באקסל</NavDropdown.Item>
                            </div>
                        </NavDropdown>
                        : null
                }
                {
                    this.props.email ?
                        <Nav className="mr-auto">
                            <LinkContainer to="/show_progress">
                                <Nav.Link>הגביעים שלי</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/user_statistics">
                                <Nav.Link>המצב שלי</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        : null
                }
                <Nav>
                    <LinkContainer to="/connect_us">
                        <Nav.Link>צור קשר</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <User></User>
                </Nav>
                {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>  */}
            </Navbar.Collapse>
        </Navbar>);
    }
}


const mapStateToProps = state => {
    state = state.toJS();
    return {
        is_admin: state.user_details.is_admin,
        email: state.user_details.email
    };
}

export default connect(mapStateToProps, null)(withRouter(NavBarBootStrap));