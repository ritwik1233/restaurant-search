import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRestaurants } from '../actions/index';

import DisplayRestaurants from './DisplayRestaurants'
import Form from './Form.js';
import Error from './Error.js';
import Loading from './Loading';

class Body extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
    }
  }

  componentDidUpdate(prevProps, state) {
    if(prevProps.error !== this.props.error && this.props.error.error !== undefined) {
      this.setState({
        error: true,
        loading:false
      });
    }
    if(prevProps.restaurant !== this.props.restaurant && this.props.error.error === undefined) {
      this.setState({
        loading:false,
        error:false
      });
    }
  }

  getRestaurantData = (data) => {
    this.setState({
      loading: true,
      error: false
    });
    this.props.getRestaurants(data);
  }

  render() {               
    let array = [];
    let resultArray = [];
    if(!this.props.restaurant.error) {
      for (var key in this.props.restaurant) {
        array.push(this.props.restaurant[key]);
      }
      resultArray = array.map((data,key) => {
        return(<DisplayRestaurants data={data} key={key}/>)
      });
    }
    return (
      <div className="container">
              <div className="row">
                <div className="col s12">
                  <div className="card">
                    <div className="card-content">
                      <br/>
                      <br/>
                      <Form getRestaurantData={this.getRestaurantData} />
                      <br/>
                      <br/>
                      <Loading loading = {this.state.loading} />
                      <Error error = {this.state.error} />
                      {resultArray}                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
  }
}

function mapStateToProps(state) {
 return {
  restaurant: state.restaurant.restaurantData,
  error :state.restaurant.error
 }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getRestaurants: getRestaurants
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
