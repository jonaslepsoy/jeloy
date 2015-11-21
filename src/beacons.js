
var beacons = {};

var beaconNames = [
  'Buenos Aires',
  'Lima',
  'Santiago',
  'Shanghai'
];

beaconNames.forEach(function(beacon) {
  beacons[beacon] = {score: 0, cappers: []};
});

function update(teams) {
  var t = new Date();

  for (var beacon in beacons.items){
    console.log(beacon);
    var blue = 0;
    var red = 0;
    for(var i = 0;i < beacons.items[beacon].cappers.length;i++){
      console.log(beacons.items[beacon].cappers[i]);
      console.log('Red: ', teams.red.players.indexOf(beacons.items[beacon].cappers[i]) > -1);
      console.log('Blue: ', teams.blue.players.indexOf(beacons.items[beacon].cappers[i]) > -1);

      if(teams.red.players.indexOf(beacons.items[beacon].cappers[i]) > -1){
        red++;
      }
      if (teams.blue.players.indexOf(beacons.items[beacon].cappers[i]) > -1){
          blue++;
      }
    }
    if(red > blue){
      beacons.items[beacon].score++;
    } else if (red < blue) {
      beacons.items[beacon].score--;
    }
    console.log('Score for ' + beacon + ' is ' + beacons.items[beacon].score);

    // We have counted the score for this tick, reset cap
    beacons.items[beacon].cappers = [];
  }

}

module.exports = {
    items: beacons,
    update: update
}
