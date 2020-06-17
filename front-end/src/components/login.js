import React, { Component } from 'react';

class login extends Component {
    render() {
        return (
            <div>
                <React.Fragment>



                    <Form dir='rtl' onSubmit={this.handleSubmit} >
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>שם משתמש</Form.Label>
                                <Form.Control name='userName' value={this.state.userName} type="text" placeholder="שם משתמש" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>קוד</Form.Label>
                                <Form.Control name='password' value={this.state.password} type="password" placeholder="קוד" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit"> כניסה למערכת</Button>
                    </Form>
                </React.Fragment>
            </div>
        );
    }
}

export default login;