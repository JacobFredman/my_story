import React from 'react';
import RotatedPartName from './RotatedPartName';

const AllRotatedPartsNames = (props) => {

    return (
        <div style={{ marginTop: '90px' }}>
            <RotatedPartName height={props.part2YLocation - props.part1YLocation} background='transparent linear-gradient(15deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='1' />
            <RotatedPartName height={props.part3YLocation - props.part2YLocation} background=' transparent linear-gradient(15deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' partNum='2' />
            <RotatedPartName height={props.part4YLocation - props.part3YLocation} background='transparent linear-gradient(9deg, #F1654F 0%, #F5C25D 100%) 0% 0% no-repeat padding-box' partNum='3' />
            <RotatedPartName height={props.part5YLocation - props.part4YLocation} background=' transparent linear-gradient(7deg, #F15F33 0%, #BF1A84 100%) 0% 0% no-repeat padding-box' partNum='4' />
            <RotatedPartName height={props.part6YLocation - props.part5YLocation} background=' transparent linear-gradient(14deg, #66BAE9 0%, #3171BB 100%) 0% 0% no-repeat padding-box' partNum='5' />
            <RotatedPartName height={props.part7YLocation - props.part6YLocation} background=' transparent linear-gradient(7deg, #0088CE 0%, #AB3C96 100%) 0% 0% no-repeat padding-box' partNum='6' />
            <RotatedPartName height={props.part8YLocation - props.part7YLocation} background=' transparent linear-gradient(9deg, #8BBF3F 0%, #43C2CF 100%) 0% 0% no-repeat padding-box' partNum='7' />
        </div>
    );
};

export default AllRotatedPartsNames;