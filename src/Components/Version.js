import React from "react";
import packageJson from '../../package.json';

const fixedStyle = {
    position: 'fixed', 
    bottom: '5px', 
    right: '15px', 
    opacity: '20%'
}

const Version = () => {
    return (
        <div style={fixedStyle}>
            Version: {packageJson.version}
        </div>
    )
}

export default Version;