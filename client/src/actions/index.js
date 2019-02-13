import axios from 'axios';
export const getrestaurants = (data) => {
     return (dispatch)=>{
    axios.post('/api/getRestaurantData',{
        city:data.city,
        cuisine:data.cuisine
    })
    .then(restaurant=>{
        if(restaurant.data.error)
        {
            const error={
                    error:"Error please check data"
                }
            dispatch({type:"GET_RESTAURANT_DATA_REJECTED",payload:error});       
        }
        else
        {
            dispatch({type:"GET_RESTAURANT_DATA",payload:restaurant.data});
        }
    }).catch(err=>{
        const error={
            error:"Error please check data"
        }
        dispatch({type:"GET_RESTAURANT_DATA_REJECTED",payload:error});      
    })
    }

}
