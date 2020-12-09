import React from 'react';

const DivsForColoredPartsLocations = (props) => {

    const divPointer = () => {
        if (this.state.ChapterNumberBeginOfPart.includes(props.chapterId)) {
            return <div
                ref={ele => (this.state.refsToBeginOfParts[this.state.ChapterNumberBeginOfPart.findIndex(i => i === props.chapterId)] = ele)}
                id={'chapter' + props.chapterId}
                style={{ height: '1px', width: '10px', backgroundColor: 'blue' }}
            />
        }
        else
            return ''
    }

    return (
        divPointer
    );
};

export default DivsForColoredPartsLocations;