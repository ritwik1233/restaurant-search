var express=require('express');
var PORT=process.env.PORT||5000;
var app=express();
var axios=require('axios');
var bodyParser=require('body-parser')
var keys=require('./keys/keys');
app.use(bodyParser.json())
app.post('/api/getRestaurantData',(req,res)=>{
    axios.get('https://developers.zomato.com/api/v2.1/cities?q='+req.body.city,{
                headers: {'user-key' : keys.ZomatoAPIKey}
            }).then(city=>
                {
                    axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id='+city.data.location_suggestions[0].id.toString(),{
                        headers: {'user-key' : keys.ZomatoAPIKey}
                        }).then(cuisines=>{
                            const cuisine=req.body.cuisine;
                            const findIndex=cuisines.data.cuisines.findIndex(data=>{
                             return data.cuisine.cuisine_name===cuisine;
                            })
                            if(findIndex)
                            {
                                axios.get('https://developers.zomato.com/api/v2.1/search?entity_id='+city.data.location_suggestions[0].id.toString()+'&entity_type=city&cuisines='+cuisines.data.cuisines[findIndex].cuisine.cuisine_id.toString(),{
                                        headers: {'user-key' : keys.ZomatoAPIKey}
                                    }).then(result=>{
                                        res.send(result.data)
                                    }).catch(err=>{
                                        const error=
                                        {
                                            error:"Error please check data"
                                        }
                                        res.send(error)
                                    })
                            }
                            else
                            {
                                const error=
                                {
                                    error:"Error please check data"
                                }
                                res.send(error)
                            }
                                    
                    }).catch(err=>{
                        const error=
                        {
                            error:"Error please check data"
                        }
                        res.send(error)
                    })
                })
                .catch(err=>{
                const error=
                {
                    error:"Error please check data"
                }
                res.send(error)
            })
})
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("Server Error")
    }
    console.log("Server On")
})