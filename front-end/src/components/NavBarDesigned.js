import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressGradient from '../components/helpComponents/ProgressGradient';

const NavBarDesigned = () => {
    return (
        <React.Fragment>
            <Row style={{
                height: '120px',
                // border: 'solid 1px',
                color: 'transparent linear-gradient(77deg, #F15F33 0%, #BF1A84 100%) 0% 0% no-repeat padding-box;',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                boxShadow: '20px 20px 24px #0000001A'
            }}>
                <Col>
                    <ProgressGradient backGroundImage="linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)" percent='70' ></ProgressGradient>
                </Col>
                <Col>
                    <h2 style={{ color: '#F15F33', fontWeight: 'bold' }}>ההתקדמות במסע</h2>
                    {/* <h2 style={{
                    color: '#F15F33',
                    // verticalAlign: 'middle',
                    margin: '0',
                    position: 'absolute',
                    top: '50%',
                    // left: '50%',
                    //  -ms-transform: translate(-50%, -50%);
                    transform: 'translate(-50%, -50%)'
                }}>ההתקדמות במסע</h2> */}
                </Col>
                <Col></Col>
            </Row>

        </React.Fragment>
    );
};

export default NavBarDesigned;