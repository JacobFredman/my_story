import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';


const Acordion = () => {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Click me!
      </Accordion.Toggle>
                        <div className="btnFiddback" style={{ marginTop: '50px', marginBottom: '50px' }} > !ניתוח ההתפתחות האישי שלי </div>

                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default Acordion;