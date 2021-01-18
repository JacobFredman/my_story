import React, { Component } from 'react';
import axios from 'axios';
import { getCookie } from './helper';
import { connect } from 'react-redux';
import { baseUrl } from './StaticData';
import { axiosInstance } from './StaticData';


class UpdateRedux extends Component {
    constructor(props) {
        super(props);
        this.getData();
    }


    getData = async () => {
        // const respone = await axios.post(
        //     baseUrl + 'get_user_data',
        //     { "tokenId": getCookie('tokenId') },
        //     { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        // );
        const respone = await axiosInstance.post(
            '/get_user_data',
            { "tokenId": getCookie('tokenId') },
        );
        this.props.onGetAuth(respone.data);
    }



    render() {
        return (
            <div>

            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onGetAuth: val => dispatch({ type: 'AUTH', val }),
    };
};

export default connect(null, mapDispatchToProps)(UpdateRedux);