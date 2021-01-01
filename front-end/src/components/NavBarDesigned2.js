import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProgressGradient from '../components/helpComponents/ProgressGradient';
import BoyImage from '../Photos/NavBar/BoyImage';
import './NavBarDesigned2.css';
import Button from 'react-bootstrap/Button';

const NavBarDesigned2 = () => {

    return (
        <div>

            <Navbar sticky="top" collapseOnSelect expand="sm" bg="" style={{ direction: 'rtl' }}>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="mr-auto"> */}
                    <Nav >
                        <Nav>
                            <BoyImage />
                        </Nav>
                        <Nav>
                            <p style={{ marginBottom: '0', lineHeight: '70px', marginRight: '15px', color: '#9947B5' }}>
                                היי אריאל(:
                            </p>
                        </Nav>
                        {/* <Nav.Link href="#features">Features</Nav.Link> */}
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                        <NavDropdown style={{ direction: 'rtl' }} title="" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* <Nav> */}
                    {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                    {/* <Nav.Link eventKey={2} href="#memes">
                            Dank memes
      </Nav.Link> */}
                    {/* </Nav> */}
                </Navbar.Collapse>
                <Navbar.Brand>
                    <h2 style={{ color: '#F15F33', fontFamily: 'Avigul', fontWeight: 'bold' }}>ההתקדמות במסע</h2>

                </Navbar.Brand>
                <Navbar.Brand >
                    <div style={{ width: '200px', direction: 'ltr' }}>
                        <ProgressGradient color='linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)' loadingPage={false} ></ProgressGradient>
                    </div>
                </Navbar.Brand>
            </Navbar>
        </div >
    );
};

export default NavBarDesigned2;