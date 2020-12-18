import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';




const DivsForColoredPartsLocations = (props) => {
    // const refsToBeginOfParts = useSelector(state => state.refsToBeginOfParts);
    // const state = useSelector(state => state);
    const dispatch = useDispatch();
    const myRef = useRef();

    useEffect(() => {
        // const subscription = props.source.subscribe();
        dispatch({ type: 'ADDREFTOBEGINOFPART', ref: myRef });
    }, []);

    let result;
    result = <div
        // ref={ele => (refsToBeginOfParts[props.chapter.part_number] = ele)}
        ref={myRef}
        id={'chapter' + props.chapter.id}
        style={{ height: '1px', width: '1px', backgroundColor: 'red' }}
    />

    // console.log(state);


    return result;
};

export default DivsForColoredPartsLocations;