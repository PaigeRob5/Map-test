var distance = require('google-distance');


distance.get(
 {
   origin: 'San Francisco, CA',
   destination: 'San Diego, CA'
 },
 function(err, data) {
   if (err) return console.log(err);
   console.log(data);
});

distance.get();