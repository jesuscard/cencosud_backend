
const express = require("express");
const axios = require('axios');
const redis = require('redis');
const Math = require("mathjs");

const { MESSEGE_ERROR_SERVICE } =  require('../config/constants')


const redisClient = redis.createClient(process.env.REDIS_PORT);
const cities = ['Santiago','Zurich','Auckland','Sydney','Londres','Georgia']

const app = express();
let errorConnection = false


app.get('/infoCiudades',async (req,res)=>{

    let infoCiudades = []

    for (let index = 0; index < cities.length; index++) {
        let result = await getInfoPais(cities[index]);
        infoCiudades =[...infoCiudades,result];

        if(errorConnection){
            index = -1
            infoCiudades = []
            errorConnection = false
        }else{
            //insert data in redis
            setRedisData(cities[index],result.cord)
        }
    }

    if(infoCiudades.length === 0 ){

    }
    else if(infoCiudades.length > 0){
        res.json({
            ok:true,
            data:infoCiudades
        })
    }
    else{
        res.status(400).json({
            ok:true,
            message: 'Ciudades no encontradas'
        })
    }

})

const  cicloCiudades= () =>{

}
 

const getInfoPais = async (city)=> {
    try {
        ramdomError()
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a25c7118595d8057e029b0e0fb3c86bd&units=metric`)
        if(resp.status == 200){
            return ({
                city,
                cord: resp.data.coord,
                temp: resp.data.main.temp, 
                hour: getCityHour(resp.data.timezone)
            })
        }else{
            return resp.message
        }
    } catch (error) {
        if(error.message == MESSEGE_ERROR_SERVICE){
            console.log('error a redis')
            timestamp = Date.now().toString()
            redisClient.hmset("api.errors", { timestamp : `Fallo de Api al realizar la consulda de la ciudad ${city}`})
            errorConnection = true
        }
        return error.message

    }
}


const getCityHour = (offset)=>{
    let dateNow = new Date();
    let localTime = dateNow.getTime();
    let localOffset = dateNow.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let offsetNew = offset/3600
    let timeOffset = utc + (3600000*offsetNew);
    let dateCity = new Date(timeOffset);
    let newDate = new Date(dateCity)

    return `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
}


const setRedisData = (city,cords) =>{

    redisClient.hgetall(city, (err, data)=>{

        if( err ) throw err;

        if ( data !== null){
            return data
        }else{
            redisClient.hmset(city, {'lat': cords.lat.toString(),'lon': cords.lon.toString()},(err,object)=>{
                if( err ) throw err;

            });
        }
    })
}


const ramdomError = ()=>{
    if (Math.random(0, 1) < 0.1) throw new Error(MESSEGE_ERROR_SERVICE)
}

module.exports = app;