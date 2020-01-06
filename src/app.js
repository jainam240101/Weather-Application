const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const publicDirectoryPath = path.join(__dirname, '../public')
const view_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")

app=express()
const port=process.env.PORT||3000

app.set('view engine',"hbs")
hbs.registerPartials(partials_path)
app.use(express.static(publicDirectoryPath))

app.get('',(require,respond)=>{
    respond.render(view_path+'/index',{
        head:"Weather",
        name:"Jainam Mehta"
    })
})

app.get('/help',(require,respond)=>{
    respond.render(view_path+'/help',{
        head:"Help",
        name:"Jainam Mehta"
    })
})

app.get('/about',(require,respond)=>{
    respond.render(view_path+"/about",{
        head:"About me",
        name:"Jainam Mehta"
    })
})

app.get('/test',(require,respond)=>{
    if(!require.query.location){
        return respond.send({
            error:"Location Invalid"
        })
    }
    console.log(require.query.location)
    address=require.query.location
    geocode(address,(error,georesponse)=>{
        if(error){
            return respond.send({
                error:error
            })
        }
        if(georesponse===undefined){
            return undefined
        }
        forecast(georesponse.latitude,georesponse.longitude,(error,forecastdata)=>{
            if(error){
                return respond.send({
                    error:error
                })
            }
            var forecast="It is "+forecastdata.summary+" with "+forecastdata.temperature+" degrees  with "+forecastdata.chance_of_rain+"% Chance of rain"
            respond.send({
                place:georesponse.place,
                forecast:forecast
            })
        })
    })
})

app.get('/help/*',(require,respond)=>{
    respond.render(view_path+"/404_page",{
        head:"Help Page is Not found ",
        name:"Jainam Mehta"
    })
})

app.get('*',(require,respond)=>{
    respond.render(view_path+"/404_page",{
        head:"404 Page",
        name:"Jainam Mehta"
    })
})

app.listen(port,()=>{
    console.log("Server Started at port "+port)
})