import React, { useState } from 'react';
import { DatePicker, message } from 'antd';

const NavBarAntd = () => {
    const [date, setDate] = useState(null);
    const handleChange = value => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setDate(value);
    };
    return (
        <div></div>
    );
};













export default NavBarAntd;




