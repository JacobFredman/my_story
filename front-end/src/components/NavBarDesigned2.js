import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProgressGradient from '../components/helpComponents/ProgressGradient';
import BoyImage from '../Photos/NavBar/BoyImage';
import './NavBarDesigned2.css';
import Button from 'react-bootstrap/Button';
import { useWindowSize, layout } from 'use-window-size-hook';
import ProgressBarMobile from './mobile/ProgressBarMobile';
import Form from 'react-bootstrap/Form';


const NavBarDesigned2 = () => {
    const { width, height, screenLayout } = useWindowSize();


    const ProgressComponents = () => {
        let result;
        if (width > 768)
            result = <>
                <Navbar.Brand >
                    <div style={{ width: width / 4, direction: 'ltr', marginRight: '50px' }}>
                        <ProgressGradient color='linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)' loadingPage={false} ></ProgressGradient>
                    </div>
                </Navbar.Brand>
                <Navbar.Brand>
                    <h2 style={{ color: '#F15F33', fontFamily: 'Avigul', fontWeight: 'bold' }}>ההתקדמות במסע</h2>
                </Navbar.Brand>
            </>
        else
            result = <Navbar.Brand >
                < ProgressBarMobile />
                {/* <p>kkkkkkkkkkkkkkkk</p> */}
            </Navbar.Brand>
        return result;
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                {/* <Navbar.Brand href="#home"> */}
                <ProgressComponents />
                {/* </Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link> */}
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <Nav >
                        <NavDropdown title="עוד" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">ראשי</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">התנתק</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link eventKey={2} href="#memes">
                            :(היי אריאל
      </Nav.Link>
                        {/* <Nav.Link href="#deets">
                            <BoyImage />
                        </Nav.Link> */}
                    </Nav>
                    <Nav>

                        <Nav.Link >
                            <BoyImage />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div >
    );
};

export default NavBarDesigned2;