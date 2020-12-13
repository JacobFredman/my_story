import React from 'react';
import DivsForColoredPartsLocations from './DivsForColoredPartsLocations';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ChapterNameCol = (props) => {
    const breakNameInd = props.chapter.chapter_name.indexOf("-") === -1 ? props.chapter.chapter_name.length : props.chapter.chapter_name.indexOf("-")
    const chapter_name = (
        <Row key={1}><Col>
            {props.isNewPart
                ? <DivsForColoredPartsLocations chapter={props.chapter} />
                : ''
            }
            <h6 className="chapterName">{props.chapter.chapter_name.substring(0, breakNameInd)}</h6>
            <p className="chapterNameSecondery" style={{ marginBottom: '0px' }}>{props.chapter.chapter_name.substring(breakNameInd + 1, props.chapter.chapter_name.length)}</p>
        </Col></Row>
    );


    return chapter_name;
};

export default ChapterNameCol;