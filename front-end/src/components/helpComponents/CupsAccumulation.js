import React from 'react';
import '../helpComponents/CupsAccumulation.css';
import '../../Photos/cup.png';
import Cup from '../helpComponents/Cup';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';



const CupsAccumulation = () => {
    const chaptersAndCups = useSelector(state => state.chaptersAndCups);


    const CountPossibleCups = () => {
        const count = chaptersAndCups.reduce((a, b) => +a + +b.max_victory_cups, 0);
        console.log(count);
        console.log(chaptersAndCups);
        return count;
    }

    const CountUserCups = () => {
        const readedChapters = chaptersAndCups.filter(chapter => chapter.is_readed);
        if (readedChapters.length === 0) return 0;
        if (readedChapters.length === 1) return readedChapters[0].victory_cups_wined;
        //else
        const count = readedChapters.reduce((a, b) => +a + +b.victory_cups_wined, 0);
        console.log(readedChapters);
        return count;
    }

    return (
        <React.Fragment>
            <div style={{ height: '60px', width: '300px', textAlign: 'right', alignItems: 'right', direction: 'rtl', position: 'relative' }}>


                <div className="cupAccumBorder">
                    <p className="cupsText" style={{ marginRight: "70px", fontSize: '20px' }}>הגביעים שצברת:</p>

                    <h6 style={{ color: '#707070', marginTop: '5px', marginRight: '15px', }}>{chaptersAndCups ? CountPossibleCups() + '/' : <Spinner animation="border" size="sm" />}</h6>
                    <h4 style={{ color: '#C68E30', marginRight: '3px' }}>{chaptersAndCups ? CountUserCups() : ''}</h4>

                </div>
                <div className="circleAroundCup" style={{ backgroundImage: "require('../../Photos/cup.png')" }} >
                    <Cup
                        key={1}
                        height={35}
                        marginPx={3}
                        gold={true}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};


export default CupsAccumulation;