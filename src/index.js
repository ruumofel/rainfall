
require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;
const best = process.env.best;;
const url = process.env.HOSTURL;
const locname = process.env.LOCNAME; 
var results = [];
let request = require('request');

app.get('/', async (req, res, body) => {   
  console.log('url : ' + url);
  console.log('locname ' + locname);
  request(url, function (err, response, body){
    const station = getStation(err,response,body,locname);
    console.log('Stattion : '+ station);
    const nameloc = getNameloc(err,response,body,locname);
    console.log('Location name : '+ nameloc);
    const rainfall = getRainfall(err,response,body,station)
    console.log('rainfall : ' + rainfall);
    const rainfallstatus = getRainfallStatus(rainfall)
    console.log('status : '+ rainfallstatus);
    const readingUnit= getReadingunit(err,response,body);
    console.log(' reading unit : ' +readingUnit)
    const timestamp= getTimestamp(err,response,body);
    console.log(' time : ' +timestamp);
    if(err){
       console.log('error:', error);
    } else if (response.statusCode=200) {
      res.send(nameloc + ' , ' + timestamp + ' , ' + rainfall +' ' +readingUnit + ' , ' + rainfallstatus)
    }
      });
  })
  
app.listen(port, () => {
  console.log(`Rainfall Service started`);
})

const getStation = (err,response,body,locname) => {
    try {
      console.log('Start to get stations ID');
      let test=JSON.parse(body);
      var searchField = locname;
        for (var i=0 ; i < (Object.keys(test.metadata.stations)).length ; i++)
          {
            if (test.metadata.stations[i].name == searchField) {
            var stationID = test.metadata.stations[i].id;
            console.log('stations ID : ' + stationID);
            return stationID
          }  
        }
    } catch (error) {
      console.log('error' , error )
    }
}

const getNameloc = (err,response,body,locname) => {
 try {
      console.log('Start to get stations ID');
      let test=JSON.parse(body);
      var searchField = locname;
        for (var i=0 ; i < (Object.keys(test.metadata.stations)).length ; i++)
          {
            if (test.metadata.stations[i].name == searchField) {
            var nameloc = test.metadata.stations[i].name;
            console.log('name loc ' + nameloc);
            return nameloc
          }  
        }
    } catch (error) {
      console.log('error' , error )
    }
}

const getRainfall = (err,response,body,station) => {
  try {
      console.log('Start to get rainfall value');
      let test=JSON.parse(body);
      var searchField = station;
      for (var i=0 ; i < (Object.keys(test.items[0].readings)).length ; i++){
        if (test.items[0].readings[i].station_id == searchField){
          console.log('rainfall value : '+ JSON.stringify(test.items[0].readings[i].value));
          var rainfallvalue = test.items[0].readings[i].value
          return rainfallvalue           
        }
      }
    } catch (error) {
      console.log('error' , error )
    }
}

const getRainfallStatus = (rainfall) => {
    try {
      console.log('Start to get rainfall Status ' + rainfall);
        if (rainfall > 0){
          var rainfallstatus = 'Rainning'
          return rainfallstatus           
        }else{
          var rainfallstatus = 'Not Rainning'
          return rainfallstatus  
        } 
    } catch (error) {
      console.log('error' , error )
    }
}

const getReadingunit = (err,response,body) => {
 try {
      console.log('Start to get stations reading unit');
      let test=JSON.parse(body);
     if(test !== null && test !== '') {
        console.log(test.metadata.reading_unit)
        return test.metadata.reading_unit
      }    
    } catch (error) {
      console.log('error' , error ) 
  }
}

const getTimestamp = (err,response,body) => {
  try {
      console.log('Start to get stations timestamp');
      let test=JSON.parse(body);
     if(test !== null && test !== '') {
        console.log(test.items[0].timestamp)
        return test.items[0].timestamp
     }
    } catch (error) {
      console.log('error' , error )
    }
}

module.exports = {
  getStation,
  getNameloc,
  getRainfall,
  getRainfallStatus,
  getReadingunit,
  getTimestamp,
  request
}