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
            tableContent: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // Don't forget to check if the inputs are corrects

        // Here i generate a random number for the key propriety that react need
        let randomID = Math.floor(Math.random() * 999999);

        // recreate a new object and stock the new line in
        let newTab = this.state.tableContent;
        newTab.push({
            key: randomID,
            title: "",
            amount: "" // Don't forget to get the value of the inputs here
        });

        this.setState({
            tableContent: newTab
        });

        // Clear the content of the inputs

        // the state has changed, so the tab is updated.
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        return (
            <div>
                <section className="App">
                    <header>
                        <h1>Money Manager</h1>
                    </header>

                    <section>
                        <h1>Finances</h1>
                        <form>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="title" onChange={this.handleChange} />

                            <label htmlFor="amount">Amount</label>
                            <input type="text" name="amount" onChange={this.handleChange} />

                            <button type="button" id="add" onClick={this.handleClick}>Add item</button>
                        </form>

                        <section>
                            <h1>Items</h1>
                            <table id="itemTable">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Remove Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tableContent.map((item) =>
                                        <tr key={item.key}>
                                            <td>{item.title}</td>
                                            <td>{item.amount}</td>
                                            <td>
                                                {/* Here add the onClick for the action "remove it" on the span */}
                                                <span>Remove it</span>
                                            </td>
                                            <td></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>
                    </section>
                </section>



            </div>
        );
    }
}

export default Demo;