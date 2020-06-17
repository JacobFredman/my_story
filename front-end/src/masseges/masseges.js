import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export class MessageWithOk extends Component {
    render() {
        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.onClickOk}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "right" }}>{this.props.bodyMsg}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.onClickOk}>אישור </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}