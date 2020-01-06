const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    url="https://api.darksky.net/forecast/fd8d25c310ce7ed2e6b5291d253915d1/"+latitude+","+longitude+"?units=si"
    console.log(url)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Network Error",undefined)
        }else if(response.body.error){
            callback("There is some error with the latitude or longitude",undefined)
        }else{
            callback(undefined,{
                summary:response.body.daily.data[0].summary,
                temperature:response.body.currently.temperature,
                chance_of_rain:response.body.currently.precipProbability,
                temperature_high:response.body.daily.data[0].temperatureHigh,
                temperature_low:response.body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports=forecast