var YQL = require('yql');

var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="chicago, il")');

query.exec(function(err, data) {
  var location = data.query.results.channel.location;
  var condition = data.query.results.channel.item.condition;
  console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
});