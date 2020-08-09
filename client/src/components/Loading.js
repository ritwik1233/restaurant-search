import React from 'react';

const Loading = (props) => {
    if(props.loading) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }
    return (<div></div>); 
}

export default Loading;