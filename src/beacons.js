
var beacons = {};

var beaconNames = [
  'Buenos Aires',
  'Lima',
  'Santiago',
  'Shanghai'
];

// Init teams and the server
function init() {

  beaconNames.forEach(function(beacon) {
      beacons[beacon] = {score: 0, cappers: []};
  });

  console.log(beacons);
}

init();


module.exports = {
    items: beacons
}
