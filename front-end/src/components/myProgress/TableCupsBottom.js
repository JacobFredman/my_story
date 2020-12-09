import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ButtonFiddbackText from '../helpComponents/ButtonFiddbackText';
import { useSelector, useDispatch } from 'react-redux';



const TableCupsBottom = () => {
    // const refEndLastPart = useSelector(state => state.refEndLastPart);
    const dispatch = useDispatch({ type: 'RefEndLastPart' });

    // const divPointer = <div ref={ele => (dispatch({ type: 'RefEndLastPart', ele }))} id={'end'} style={{ height: '1px', width: '10px', backgroundColor: 'blue' }}></div>; 

    return (
        <tr >
            <td colSpan="3">
                <Container>
                    <Row style={{ direction: 'rtl' }}>
                        <Col>
                            {/* <div ref={ele => (dispatch({ type: 'RefEndLastPart', ele }))} id={'end'} style={{ height: '1px', width: '10px', backgroundColor: 'blue' }}></div> */}
                        </Col>
                        <Col xs={8}>
                            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                                <ButtonFiddbackText onClick={() => this.props.history.push("/user_statistics")} />
                            </div>
                        </Col>
                        <Col><p style={{ font: 'normal normal 600 16px/13px Assistant', color: '#AB3C96', position: 'absolute', top: '20%' }}>אפס מסע</p></Col>
                    </Row>
                </Container>
            </td>
        </tr>
    );
};

export default TableCupsBottom;