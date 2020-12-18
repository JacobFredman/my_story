import React from 'react';

const UnreadedSign = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width={props.size} height={props.size} viewBox="0 0 37 37">
            <defs>
                <filter id="Ellipse_24" x="0" y="0" width="37" height="37" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feFlood floodOpacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_24)">
                <g id="Ellipse_24-2" data-name="Ellipse 24" transform="translate(4.5 3.5)" fill="#fff" stroke="#ebeff9" strokeLinecap="round" strokeWidth="3">
                    <circle cx="14" cy="14" r="14" stroke="none" />
                    <circle cx="14" cy="14" r="12.5" fill="none" />
                </g>
            </g>
        </svg>

    );
};

export default UnreadedSign;