
import React from 'react';
import axios from 'axios';


const Test1 = () => {

    const axiosInstance1 = axios.create({
        // baseURL: 'http://localhost:5000/api/',
        baseURL: '/api/',
        // timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });


    const axiosInstance2 = axios.create({
        // baseURL: 'http://localhost:5000/api/',
        baseURL: '/api',
        // timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });



    const axiosInstance3 = axios.create({
        // baseURL: 'http://localhost:5000/api/',
        // baseURL: 'https://my-story-pro.ew.r.appspot.com/api/',
        // timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });

    const axiosInstance4 = axios.create({
        // baseURL: 'http://localhost:5000/api/',
        baseURL: 'https://achraiut-test.et.r.appspot.com/api/',
        // timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    const axiosInstance5 = axios.create({
        // baseURL: 'http://localhost:5000/api/',
        baseURL: 'https://achraiut-test.et.r.appspot.com/api',
        // timeout: 1000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });


    const response1 = () => axiosInstance1.post(
        '/sign_in',
        { "tokenId": '1' },
    );
    const response2 = () => axiosInstance2.post(
        '/sign_in',
        { "tokenId": '2' },
    );
    const response3 = () => axiosInstance3.post(
        '/api/sign_in',
        { "tokenId": '3' },
    );
    const response4 = () => axiosInstance4.post(
        '/sign_in',
        { "tokenId": '4' },
    );
    const response5 = () => axiosInstance5.post(
        '/sign_in',
        { "tokenId": '5' },
    );




    return (
        <div>
            <button onClick={response1}>1</button>
            <button onClick={response2}>2</button>
            <button onClick={response3}>3</button>
            <button onClick={response4}>4</button>
            <button onClick={response5}>5</button>
        </div>
    );
};

export default Test1;


