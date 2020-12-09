import React from 'react';
import DivsForColoredPartsLocations from './DivsForColoredPartsLocations';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ChapterNameCol = (props) => {

    const breakNameInd = props.chapterName.indexOf("-") === -1 ? props.chapterName.length : props.chapterName.indexOf("-")
    const chapter_name = (
        <Row key={1}><Col>
            <DivsForColoredPartsLocations chapterId={props.chapterId} />
            <h6 className="chapterName">{props.chapterName.substring(0, breakNameInd)}</h6>
            <p className="chapterNameSecondery" style={{ marginBottom: '0px' }}>{props.chapterName.substring(breakNameInd + 1, props.chapterName.length)}</p>
        </Col></Row>
    );


    return chapter_name;
};

export default ChapterNameCol;