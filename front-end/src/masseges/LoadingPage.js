import React, { Component } from 'react';
import './LoadingPage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

class LoadingPage extends Component {
    render() {
        return (
            // <Row>
            //     <Col>
            //         <Jumbotron fluid>
            //             <Container >
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    {/* <Spinner animation="border" /> */}
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    {/* <h1>jh</h1> */}
                </Col>
            </Row>
            //             </Container>
            //         </Jumbotron>
            //     </Col>
            // </Row>

        );
    }
}

export default LoadingPage;