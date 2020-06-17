import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export class WarnningWithOk extends Component {
    componentDidMount() {
    }


    render() {
        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.onClickOk}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title>נתון לא תקין</Modal.Title> */}
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body style={{ textAlign: "right" }}>מס תעודת זהות לא תקין </Modal.Body> */}
                    <Modal.Body style={{ textAlign: "right", color: 'green' }}>{this.props.bodyMsg}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.onClickOk}>אישור </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}
export class WarnningWithOkCencel extends Component {
    render() {
        return (
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.onClickOk}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "right", color: 'green' }}>{this.props.bodyMsg}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.onClickOk}>אישור </Button>
                        <Button autoFocus name='kdkdkdk' variant="primary" onClick={this.props.onClickCencel}>ביטול </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}