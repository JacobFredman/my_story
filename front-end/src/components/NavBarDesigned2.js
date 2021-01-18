import React, { useContext } from 'react';
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
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FirebaseContext from '../components/Firebase/context';
import { baseUrl } from '../utils/StaticData';






const NavBarDesigned2 = (props) => {
    const { width, height, screenLayout } = useWindowSize();
    const dispatch = useDispatch();
    const user_details = useSelector(state => state.user_details);
    const firebase = useContext(FirebaseContext);


    const logOff = () => {
        firebase.doSignOut();
        document.cookie = 'tokenId=signedOut; path=/;';
        document.cookie = 'refreshToken=signedOut; path=/;';
        // window.UserUtils.disconnect();
        dispatch({
            type: 'onGetAuth',
            email: null,
            is_admin: 0
        });
        props.history.push('/sign_in');
        // this.redirectNotConnectedUser();
    }

    const Admin = () => {
        if (user_details.is_admin)
            return <> <NavDropdown.Divider />
                {/* <LinkContainer to="/admin/users_statistics">
                    <NavDropdown.Item >מנהל</NavDropdown.Item>
                </LinkContainer> */}
                <div onClick={() => window.open(baseUrl + "admin/get_all_useres_cups.csv?t=" + Date.now(), "_blank")}>
                    <NavDropdown.Item >נתוני משתמשים באקסל</NavDropdown.Item>
                </div>
            </>;
        return '';
    }

    const RealBoyPhoto = () => {
        //  console.log(firebase.getCurrentUser().email) 

        if (firebase.getCurrentUser() && firebase.getCurrentUser().photoURL)
            return <img width='70px' height='70px' src={firebase.getCurrentUser().photoURL} style={{ borderRadius: '50%' }} />;
        else
            return <BoyImage />;
    };

    const Display_name = () => {
        const smaily = '(:';
        let show_name = 'חבר';
        if (user_details.display_name)
            show_name = user_details.display_name;
        else if (user_details.user_first_name && user_details.user_last_name)
            show_name = user_details.user_first_name + ' ' + user_details.user_last_name;
        return " היי " + show_name + smaily;
        // {
        //     user_details.display_name
        //         ?
        //         'היי ' + user_details.display_name
        //         :
        //         'היי ' + user_details.user_first_name + ' ' + user_details.user_last_name
        // }
    }



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
            </Navbar.Brand>
        return result;
    }

    return (
        <>
            <style type="text/css">
                {`
                .sticky-top {
                    position: sticky;
                    top: 15px;
                    z-index: 100;
                }

    .bg-light {
        background-color: #FFFFFF !important;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
            </style>
            <Navbar collapseOnSelect sticky='top' expand="lg" bg="light" variant="light">
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
                            {/* <NavDropdown.Item href="http://mystory.mmb.org.il/" target="blank">לדף הראשי</NavDropdown.Item> */}
                            <LinkContainer exact to="/">
                                <NavDropdown.Item >ההתקדמות שלי</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/quick_fill_cups">
                                <NavDropdown.Item >מילוי מהיר</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="http://mystory.mmb.org.il" target="blank">ראשי</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <div onClick={logOff}>
                                <NavDropdown.Item >התנתק</NavDropdown.Item>
                            </div>
                            <Admin />
                        </NavDropdown>
                        <Nav.Link eventKey={2} style={{ direction: 'rtl' }} >
                            {/* :)היי חבר */}
                            <Display_name />
                            {console.log(user_details)}

                        </Nav.Link>
                        {/* <Nav.Link href="#deets">
                            <BoyImage />
                        </Nav.Link> */}
                    </Nav>
                    <Nav>

                        <Nav.Link >
                            <RealBoyPhoto />
                            {/* <BoyImage /> */}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavBarDesigned2;