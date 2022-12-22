import React from "react";
import packageJson from '../../package.json';

const fixedStyle = {
    position: 'fixed', 
    bottom: '5px', 
    right: '15px', 
    opacity: '20%'
}

const Version = () => {
    if (process.env.NODE_ENV === 'development') {
        return (
            <div style={fixedStyle}>
                (DEVELOPMENT MODE) Version: {packageJson.version}
            </div>
        )
    } else {
        return (
            <div style={fixedStyle}>
                Version: {packageJson.version}
            </div>
        )
    }
}

export default Version;