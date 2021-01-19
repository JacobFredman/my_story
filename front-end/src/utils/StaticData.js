import axios from 'axios';


export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api/',
    baseURL: 'https://my-story-pro.ew.r.appspot.com/api/',
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});






export const baseUrl = "https://my-story-pro.ew.r.appspot.com/api/";
// export const baseUrl = "http://localhost:5000/api/";
// export const baseUrl = "https://achraiut-test3.el.r.appspot.com/api/";





// export const expTokenTime = 1000 * 60 * 60; // one hour

export const expTokenInterval = 1000 * 60 * 20; // one hour


export const msgExpTokenInterval = 1000 * 60 * 18;
