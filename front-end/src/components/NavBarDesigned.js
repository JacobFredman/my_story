import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressGradient from '../components/helpComponents/ProgressGradient';
import Progress from '../components/helpComponents/Progress';

const NavBarDesigned = () => {
    return (
        <React.Fragment>
            <Row style={{
                // height: '120px',
                // border: 'solid 1px',
                color: 'transparent linear-gradient(77deg, #F15F33 0%, #BF1A84 100%) 0% 0% no-repeat padding-box;',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                boxShadow: '20px 20px 24px #0000001A'
            }}>
                <Col>
                    <div style={{ marginTop: '25px', marginBottom: '25px', marginLeft: '25px' }} >
                        <ProgressGradient color='linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)' backGroundImage="linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)" percent='32' ></ProgressGradient>
                        {/* <Progress backGroundImage="linear-gradient(77deg, #F15F33 0%, #BF1A84 100%)" color='#873FFF' percent='70' ></Progress> */}
                    </div>
                </Col>
                <Col>
                    <h2 style={{ color: '#F15F33', fontFamily: 'Avigul', fontWeight: 'bold', padding: '20px 20px 20px 20px' }}>ההתקדמות במסע</h2>
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