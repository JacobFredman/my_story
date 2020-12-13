import React from 'react';
import Table from 'react-bootstrap/Table';


const TableCupsHeader = () => {
    return (
        <thead>
            <tr>
                <td>
                    <div style={{ height: '20px' }}></div>
                </td>
            </tr>
            <tr style={{ background: '#F6F9FF 0% 0% no-repeat padding-box', color: '#24A3AA' }}>
                <th className="headerTable">שם הפרק</th>
                <th className="headerTable">מספר הגביעים שצברת</th>
                <th className="headerTable">קראתי</th>
                <th className="headerTable">צבירה</th>
            </tr>
        </thead>
    );
};

export default TableCupsHeader;