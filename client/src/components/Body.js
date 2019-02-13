import React, { Component } from 'react';
import DisplayRestaurants from './DisplayRestaurants'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getrestaurants} from '../actions/index';
import {Field,reduxForm} from 'redux-form';
class Body extends Component 
{
    constructor(props)
    {
      super(props)
      this.state={
                  loading:false,
                  error:false,
                }
    }
    renderField(field)
    {
      const pStyle ={
                      fontSize: '15px',
                      color:'red'
                    };
      return(<div>
                <p style={pStyle}>{field.meta.touched?field.meta.error:''}</p>
                <input  
                  type="text"
                  placeholder={field.placeholder}
                  className={field.className}
                  {...field.input}
                />
              </div>
            );
    }
  componentDidUpdate(prevProps,state)
  {
  if(prevProps.error!==this.props.error&&this.props.error.error!==undefined)
  {
      this.setState({
            error:true,
            loading:false
      })
  }
  if(prevProps.restaurant!==this.props.restaurant&&this.props.error.error===undefined)
  {
   
      this.setState({
          loading:false,
          error:false
      })
  }
  
 
}


onSubmit(values)
  {
    this.setState({
              loading:true,
              error:false
    })
    const data={
        city:values.city,
        cuisine:values.cuisine
      }
    this.props.getrestaurants(data);
  }
 render()
 {
    const {handleSubmit}=this.props;                           
    let array=[];
    let resultArray=[];
    if(!this.props.restaurant.error)
    {
      for (var key in this.props.restaurant) 
      {
        array.push(this.props.restaurant[key]);
      }
      resultArray=array.map((data,key)=>{return(<DisplayRestaurants data={data} key={key}/>)})
    }
    let loading=<div></div>
    let error=<div></div>
    if(this.state.error===true)
    {
      error=<div><h3>No Data Found</h3></div>
    }
    if(this.state.loading===true)
    {
      loading=<div className="progress">
                <div className="indeterminate"></div>
            </div>
    }
    return (<div className="container">
              <div className="row">
                <div className="col s12">
                  <div className="card">
                    <div className="card-content">
                      <br/>
                      <h4>Get Restaurants Information</h4>
                      <br/>
                      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="container">
                        <div className="row">
                            <Field
                                className="col s12"
                                placeholder="Enter City"
                                name="city"
                                component={this.renderField}
                              />
                           <Field
                               className="col s12"
                                placeholder="Enter cuisine"
                                name="cuisine"
                                component={this.renderField}
                              />
                           <div className="col s12">
                              <button type="submit" className="waves-effect hoverable col s4 offset-s4 waves-light btn  red ligthen-1" >
                                <i className="right material-icons ">search</i>Search
                              </button>
                            </div>
                         </div>
                      </form>
                      <br/>
                      <br/>
                      {loading}
                      {error}
                      {resultArray}                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
  }
}
function validate(values)
{
   const errors={};
    if(!values.city)
    {
        errors.city="Enter City";
    } 
    if(!values.cuisine)
    {
        errors.cuisine="Enter Cuisine";
    }
   return errors;
}
function mapStateToProps(state)
{
 return{
  restaurant:state.restaurant.restaurantData,
  error:state.restaurant.error
 }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({getrestaurants:getrestaurants},dispatch);
}
export default reduxForm({
  form:'restaurantData',
  validate
})(connect(mapStateToProps,mapDispatchToProps)(Body));
