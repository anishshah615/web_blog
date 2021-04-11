import React from 'react';
export default function Reaction({ handleClick, emoji, label, className, comment }) {    
    return (
        <span
            className={
                className ? className + " emoji" : "emoji"
            }
            role='button'
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
            onClick={(e) => handleClick(e, emoji,label, comment)}
            
        >
            {emoji}
        </span>
    );
}