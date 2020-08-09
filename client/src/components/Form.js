import React, { useState } from 'react';

const Form = (props) => {
    const [cityError, setCityError] = useState('');
    const [cusineError, setCuisineError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setCityError('');
        setCuisineError('');
        const city = e.target.city.value;
        if(city.length === 0) {
            setCityError('City is Empty');
            return;
        }
        const cuisine = e.target.cuisine.value;
        if(cuisine.length === 0) {
            setCuisineError('Cuisine is Empty');
            return;
        }
        const result = {
            city: city.trim(),
            cuisine: cuisine.trim()
        };
        props.getRestaurantData(result);
    }
    const errorStyle = {
        color:'red'
      };
    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="row">
                <div className="col s12">
                    { cityError.length > 0 ? <p style={errorStyle}>{cityError}</p> : undefined }
                    <input placeholder = "Enter Cuisine" name="city" />
                </div>
                <div className="col s12">
                    { cusineError.length > 0 ? <p style={errorStyle}>{cusineError}</p> : undefined }
                    <input placeholder = "Enter Cuisine" name="cuisine" />
                </div>
                <div className="col s12">
                    <button type="submit" className="waves-effect hoverable col s4 offset-s4 waves-light btn  red ligthen-1" >
                        <i className="right material-icons ">search</i>Search
                    </button>
                </div>
            </div>
        </form>
    ); 
}

export default Form



