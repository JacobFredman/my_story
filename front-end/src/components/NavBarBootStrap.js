import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import User from '../components/user/UserInNavBar';
import { withRouter } from 'react-router-dom';
import { baseUrl } from '../utils/StaticData';






class NavBarBootStrap extends Component {
    render() {
        return (
            // <div>
            //     <Navbar collapseOnSelect expand="lg" dir='rtl' bg="dark" variant="dark">
            //         <LinkContainer to="/">
            //             <Navbar.Brand >לוקחים אחריות</Navbar.Brand>
            //         </LinkContainer>
            //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            //         <Navbar.Collapse id="responsive-navbar-nav">
            //             <Nav className="ml-auto">
            //                 <NavDropdown title="עובדים" id="collasible-nav-dropdown">
            //                     <LinkContainer to="/workers_details/worker_form">
            //                         <NavDropdown.Item >מאגר עובדים</NavDropdown.Item>
            //                     </LinkContainer>
            //                 </NavDropdown>
            //                 <NavDropdown title="ניהול הבקשות" id="'collasible'-nav-dropdown">
            //                     <LinkContainer to="/demands_details/demand_form">
            //                         <NavDropdown.Item >בקשות</NavDropdown.Item>
            //                     </LinkContainer>
            //                 </NavDropdown>
            //                 <NavDropdown title="ניהול המערכת" id="collasible-nav-dropdown">
            //                     <LinkContainer to="/administration/zone">
            //                         <NavDropdown.Item >מחוז</NavDropdown.Item>
            //                     </LinkContainer>
            //                     <LinkContainer to="/administration/court">
            //                         <NavDropdown.Item >יחידה</NavDropdown.Item>
            //                     </LinkContainer>
            //                     <LinkContainer to="/administration/grade">
            //                         <NavDropdown.Item >דירוג</NavDropdown.Item>
            //                     </LinkContainer>
            //                     <LinkContainer to="/administration/str_reason">
            //                         <NavDropdown.Item >סיבת התקן</NavDropdown.Item>
            //                     </LinkContainer>
            //                     <LinkContainer to="/administration/standart">
            //                         <NavDropdown.Item >תקנים</NavDropdown.Item>
            //                     </LinkContainer>
            //                     <LinkContainer to="/administration/malam_court">
            //                         <NavDropdown.Item >יחידות מל"מ</NavDropdown.Item>
            //                     </LinkContainer>
            //                 </NavDropdown>
            //                 <NavDropdown title="דוחות" id="collasible-nav-dropdown">
            //                     <div onClick={() => window.GetReport.getReport('demandsReport.csv', 'demands', { "year": this.props.yearActivated.toString() })}>
            //                         <NavDropdown.Item >דוח בקשות</NavDropdown.Item>
            //                     </div>
            //                     <div onClick={() => window.GetReport.getReport('demandsReport.csv', 'stop_date_not_in_the_end_of_year', { "ChooseYear": this.props.yearActivated.toString() })}>
            //                         <NavDropdown.Item >{' דוח עובדים אשר התקן שלהם מסתיים לפני' + ' 31/12/' + this.props.yearActivated.toString()}</NavDropdown.Item>
            //                     </div>
            //                     <NavDropdown.Item href="#action/3.2">דוח ב</NavDropdown.Item>
            //                     <NavDropdown.Item href="#action/3.3">דוח ג</NavDropdown.Item>
            //                     <NavDropdown.Divider />
            //                     <LinkContainer to="/report_generator">
            //                         <NavDropdown.Item>מחולל דוחות</NavDropdown.Item>
            //                     </LinkContainer>
            //                 </NavDropdown>
            //                 <NavDropdown title="show_progress" id="collasible-nav-dropdown">
            //                     <LinkContainer to="/show_progress">
            //                         <Navbar.Item >ההתקדמות שלי</Navbar.Item>
            //                     </LinkContainer>
            //                 </NavDropdown>
            //             </Nav>
            //             <Nav>
            //                 <User></User>
            //             </Nav>
            //         </Navbar.Collapse>
            //     </Navbar>
            <div>
                <Navbar expand="lg" dir='rtl' bg="light" expand="lg">
                    <LinkContainer to="/">
                        <Navbar.Brand>לוקחים אחריות</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
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
                        <Nav className="mr-auto">
                            <LinkContainer to="/show_progress">
                                <Nav.Link>הגביעים שלי</Nav.Link>
                            </LinkContainer>
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
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavBarBootStrap);