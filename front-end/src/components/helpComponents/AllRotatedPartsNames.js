import React from 'react';
import RotatedPartName from './RotatedPartName';
import { useSelector, useDispatch } from 'react-redux';


const AllRotatedPartsNames = (props) => {
    const refsToBeginOfParts = useSelector(state => state.refsToBeginOfParts);
    const refEndLastPart = useSelector(state => state.refEndLastPart);

    let positions = [];


    const SetPositions = () => {
        if (refsToBeginOfParts[3]) {
            console.log(refsToBeginOfParts[3]);
            // console.log(window.scrolly + this.state.refsToBeginOfParts[3].getBoundingClientRect().top);
            for (let i = 0; i < refsToBeginOfParts.length; i++)
                if (refsToBeginOfParts[i].current)
                    positions[i] = refsToBeginOfParts[i].current.getBoundingClientRect().top;
            if (refEndLastPart.current)
                positions.push(refEndLastPart.current.getBoundingClientRect().top);
            return positions;
        }
    }

    SetPositions();
    console.log(positions);

    return (
        // <div style={{ marginTop: '92px' }}>
        //     <RotatedPartName height={positions[1] - positions[0]} background='transparent linear-gradient(15deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='1' />
        //     <RotatedPartName height={positions[2] - positions[1]} background='transparent linear-gradient(15deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='2' />
        //     <RotatedPartName height={positions[3] - positions[2]} background='transparent linear-gradient(15deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='3' />
        //     <RotatedPartName height={positions[4] - positions[3]} background='transparent linear-gradient(15deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='4' />
        // </div>

        <div style={{ marginTop: '92px' }}>
            <RotatedPartName height={positions[1] - positions[0]} background='transparent linear-gradient(15deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='1' />
            <RotatedPartName height={positions[2] - positions[1]} background=' transparent linear-gradient(15deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' partNum='2' />
            <RotatedPartName height={positions[3] - positions[2]} background='transparent linear-gradient(9deg, #F1654F 0%, #F5C25D 100%) 0% 0% no-repeat padding-box' partNum='3' />
            <RotatedPartName height={positions[4] - positions[3]} background=' transparent linear-gradient(7deg, #F15F33 0%, #BF1A84 100%) 0% 0% no-repeat padding-box' partNum='4' />
            <RotatedPartName height={positions[5] - positions[4]} background=' transparent linear-gradient(14deg, #66BAE9 0%, #3171BB 100%) 0% 0% no-repeat padding-box' partNum='5' />
            <RotatedPartName height={positions[6] - positions[5]} background=' transparent linear-gradient(7deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='6' />
            <RotatedPartName height={positions[7] - positions[6]} background=' transparent linear-gradient(9deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' partNum='7' />
        </div>
    );
};

export default AllRotatedPartsNames;