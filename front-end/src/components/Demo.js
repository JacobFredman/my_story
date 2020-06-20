import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'react-responsive-modal/styles.css';



class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    };

    render() {
        return (
            <div>
                <Modal open={this.state.open} onClose={() => this.setState({ open: false })} center>
                    {/* <SaveModal
                                modelIsUpdate={this.state.modelIsUpdate}
                                dontDisplay={this.props.dontDisplay}
                                disables={this.props.disables}
                                keysOfTable={this.props.keysOfTable}
                                header={this.props.header}
                                onSaveClick={values => { this.setState({ open: false }); this.saveRow(values) }}
                                selectedRow={this.state.selectedRow}
                                tableName={this.props.tableName}
                                defaultValues={this.props.defaultValues}
                            /> */}
                    <Container>
                        <Row>
                            <Col>
                                <div>hkjkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</div>
                            </Col>
                        </Row>
                    </Container>
                </Modal>
            </div>
        );
    }
}

export default Demo;