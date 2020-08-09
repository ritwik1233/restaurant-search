import React from 'react';

const Error = (props) => {
    if(props.error) {
        return (
            <div>
              <h3>No Data Found</h3>
            </div>
        );
    }
    return (<div></div>); 
}

export default Error;