const request=require('request')
const geocode=(address,callback)=>{
    location_url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiamFpbmFtMjQiLCJhIjoiY2s0cGtkMXM0MzRlejNtcXcxN2l4M3VwNSJ9.G1_bX5xyabrJ_JUXrZiqNQ&limit=1"
    request({url:location_url,json:true},(error,response)=>{
        if(error){
            callback('There is some network issue',undefined)
        }else if(response.body.features.length===0){
            console.log()
            callback("There is Problem with URL",undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place:response.body.features[0].place_name 
            })
        }
    })
}
module.exports=geocode