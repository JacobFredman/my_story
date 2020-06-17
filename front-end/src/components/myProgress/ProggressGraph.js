import React, { Component } from 'react';
import Chart from "react-google-charts";


class ProggressGraph extends Component {
    myArray = {
        my: 'שלי', avgUsers: 'ממוצע משתמשים', element: 'אלמנט', control: 'שליטה עצמית', selfConnection: 'חיבור עצמי',
        commitmentToSuccess: 'מחוייבות להצלחה', SelfFulfillment: 'מימוש עצמי'
    };

    render() {
        { console.log(this.control) }
        return (
            <Chart
                // width={400}
                height={500}
                chartType="BarChart"
                loader={<div>טוען נתונים</div>}
                data={[
                    [
                        'Element',
                        'הצלחה באחוזים',
                        { role: 'style' },
                        {
                            sourceColumn: 0,
                            role: 'annotation',
                            type: 'string',
                            calc: 'stringify',
                        },
                    ],
                    [this.myArray['control'], parseFloat(this.props.my_your_control) * 100, '#8533ff', null],
                    [this.myArray['selfConnection'], parseFloat(this.props.my_connection_to_yourself) * 100, '#3399ff', null],
                    [this.myArray['commitmentToSuccess'], parseFloat(this.props.my_commitment_to_success) * 100, '#aaff00', null],
                    [this.myArray['SelfFulfillment'], parseFloat(this.props.my_self_fulfillment) * 100, '#33ff99', null],
                    // ['Platinum', 21.45, 'color: #e5e4e2', null],
                ]}
                options={{
                    title: 'התקדמות לפי פרמטרים',
                    // chartArea: { width: '70%' },
                    hAxis: {
                        title: 'התקדמות באחוזים',
                        minValue: 0,
                        maxValue: 100
                    },
                    vAxis: {
                        title: 'אחוזים',
                        maxValue: 100
                    },
                }}
            // legendToggle
            />


        )
    }
}

export default ProggressGraph;