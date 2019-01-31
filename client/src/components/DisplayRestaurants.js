import React, { Component } from 'react';

class DisplayRestaurants extends Component {
    constructor(props)
    {
      super(props)
      this.state={
        image:props.data.restaurant.featured_image?props.data.restaurant.featured_image:'noImage.png'
      }
    }
  
    componentWillReceiveProps(){
      this.setState({image:this.props.data.restaurant.featured_image?this.props.data.restaurant.featured_image:'noImage.png'})
    }

    render() 
    {
      return (<div className="row">
                <div className="col s12 " >
                  <br/>
                  <br/>
                  <div className="card">
                    <div className="card-image">
                      <img className="responsive-img " style={{width:'100%' ,height:'300px'}} src={this.state.image} alt=""/>
                        <span className="card-title "><strong>{this.props.data.restaurant.name}</strong></span>
                    </div>
                  <div className="card-content">
                    <div className="row">  
                      <div className="col s12">
                              <p><strong>Name&nbsp;:&nbsp;</strong>{this.props.data.restaurant.name}</p>
                          </div>
                      <div className="col s12">
                            <p><strong>Cuisine&nbsp;:&nbsp;</strong>{this.props.data.restaurant.cuisines}</p>
                          </div>
                      <div className="col s12">
                            <p><strong>Rating&nbsp;:&nbsp;</strong>{this.props.data.restaurant.user_rating.aggregate_rating}</p><br/>
                            <p><strong>Comments&nbsp;:&nbsp;</strong>{this.props.data.restaurant.user_rating.rating_text}</p><br/>
                            <p><strong>Votes&nbsp;:&nbsp;</strong>{this.props.data.restaurant.user_rating.votes}</p><br/>
                          </div>
                      <div className="col s12">
                            <p><strong>Address&nbsp;:&nbsp;</strong>{this.props.data.restaurant.location.address}</p>
                          </div>
                      <div className="col s12">
                        <p><strong>City&nbsp;:&nbsp;</strong>{this.props.data.restaurant.location.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}

export default DisplayRestaurants;
