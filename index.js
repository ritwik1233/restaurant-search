const express = require('express');
const PORT = process.env.PORT||5000;
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser')


const keys = require('./keys/keys');
app.use(bodyParser.json());

app.post('/api/getRestaurantData', (req,res)=>{
    const cityName = req.body.city;
    axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}`, {
        headers: {
            'user-key' : keys.ZomatoAPIKey
        }
    }).then(city => {
       const cityId =  city.data.location_suggestions[0].id.toString();
       return  axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`, {
           headers: {
            'user-key' : keys.ZomatoAPIKey
           }
        });
    }).then(cuisines => {
        const cuisine = req.body.cuisine;
        // check if cuisine entered is a valid cuisine
        const findIndex = cuisines.data.cuisines.findIndex(data => {
            return data.cuisine.cuisine_name === cuisine;
        });
        if(findIndex) {
            const entityId = city.data.location_suggestions[0].id.toString();
            const cuisines = cuisines.data.cuisines[findIndex].cuisine.cuisine_id.toString();
            return axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${entityId}&entity_type=city&cuisines=${cuisines}`, {
                headers: {
                    'user-key' : keys.ZomatoAPIKey
                }
            });
        }
        return new Promise();
    }).then(result => {
        if(result) {
            // remove zomato api key from response
            return res.send(result.data.restaurants.map(eachData => {
                return {
                    ...eachData,
                    apikey:0,
                    restaurant:{
                        ...eachData.restaurant,
                        apikey:0
                    }
                }
            }));
        }
        throw new Error('Invalid Cusisine promise empty');
    }).catch(err => {
        const error = {
            error:"Error Invalid data"
        };
        console.log(err);
        return res.send(error)
    });
});

// app.post('/api/getRestaurantData', (req,res) => {
//     const cityName = req.body.city;
//     axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}`, {
//                 headers: {
//                     'user-key' : keys.ZomatoAPIKey
//                 }
//             }).then(city => {
//                     // get city Id from the list
//                     const cityId = city.data.location_suggestions[0].id.toString();
//                     axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`,{
//                         headers: {
//                             'user-key' : keys.ZomatoAPIKey
//                         }
//                         }).then(cuisines => {
//                             const cuisine = req.body.cuisine;
//                             // check if cuisine entered is a valid cuisine
//                             const findIndex = cuisines.data.cuisines.findIndex(data => {
//                              return data.cuisine.cuisine_name === cuisine;
//                             })
//                             if(findIndex) {
//                                 const entityId = city.data.location_suggestions[0].id.toString();
//                                 const cuisines = cuisines.data.cuisines[findIndex].cuisine.cuisine_id.toString();
//                                 axios.get('https://developers.zomato.com/api/v2.1/search?entity_id='+ entityId+'&entity_type=city&cuisines=' + cuisines, {
//                                         headers: {
//                                             'user-key' : keys.ZomatoAPIKey
//                                         }
//                                     }).then(result => {
                                       
//                                     }).catch(err=>{
//                                         const error = {
//                                             error:"Error Invalid data"
//                                         };
//                                         res.send(error)
//                                     });
//                             } else {
//                                 const error = {
//                                     error:"Error Invalid data"
//                                 };
//                                 res.send(error)
//                             }
                                    
//                     }).catch(err => {
//                         const error = {
//                             error:"Error Invalid Data"
//                         }
//                         console.log(err);
//                         res.send(error);
//                     })
//                 })
//                 .catch(err => {
//                 const error = {
//                     error: 'Error Invalid Data'
//                 }
//                 console.log(err);
//                 res.send(error);
//             })
// });
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(PORT, (err) => {
    if(err) {
        console.log('Server Error', err);
    }
    console.log('Server On Listening on Port', PORT);
});