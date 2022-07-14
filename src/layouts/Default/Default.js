import React from 'react';

const Default = ({ children }) => {
    return (
        <div>
            <p>I am default layout</p>
            { children }
        </div>
    );
};

export default Default;