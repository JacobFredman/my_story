import React from 'react';

const ReadedSign = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width={props.size} height={props.size} viewBox="0 0 43 43">
            <defs>
                <filter id="Ellipse_50" x="0" y="0" width="43" height="43" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feFlood floodOpacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g id="Group_2121" data-name="Group 2121" transform="translate(-540.5 -418.5)">
                <g transform="matrix(1, 0, 0, 1, 540.5, 418.5)" filter="url(#Ellipse_50)">
                    <g id="Ellipse_50-2" data-name="Ellipse 50" transform="translate(7.5 6.5)" fill="#fff" stroke="#30b435" strokeLinecap="round" strokeWidth="3">
                        <circle cx="14" cy="14" r="14" stroke="none" />
                        <circle cx="14" cy="14" r="12.5" fill="none" />
                    </g>
                </g>
                <path id="Path_20129" data-name="Path 20129" d="M4868.75,1981.25l3.25,3.417L4882,1974" transform="translate(-4199.728 -1793.445) rotate(3)" fill="none" stroke="#30b435" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            </g>
        </svg>
    );
};

export default ReadedSign;