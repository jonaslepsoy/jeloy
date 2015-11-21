
var beacons = {};

var beaconNames = [
  'Buenos Aires',
  'Lima',
  'Santiago',
  'Shanghai'
];

beaconNames.forEach(function(beacon) {
  beacons[beacon] = {
      score: 0,
      cappers: []
  };
});

console.log('beacons', beacons);

function update(teams) {
  var t = new Date();

  for (var beacon in beacons){
    console.log(beacon);
    debugger;
    var blue = 0;
    var red = 0;
    for(var i = 0;i < beacons[beacon].cappers.length;i++){
      console.log(beacons[beacon].cappers[i]);
      console.log('Red: ', teams.red.players.indexOf(beacons[beacon].cappers[i]) > -1);
      console.log('Blue: ', teams.blue.players.indexOf(beacons[beacon].cappers[i]) > -1);

      if(teams.red.players.indexOf(beacons[beacon].cappers[i]) > -1){
        red++;
      }
      if (teams.blue.players.indexOf(beacons[beacon].cappers[i]) > -1){
          blue++;
      }
    }
    if(red > blue){
      beacons[beacon].score+=10;
    } else if (red < blue) {
      beacons[beacon].score-=10;
    }
    console.log('Score for ' + beacon + ' is ' + beacons[beacon].score);

    // We have counted the score for this tick, reset cap
    beacons[beacon].cappers = [];
  }

}

function addUser(beaconName, id) {
    //beacons[beaconName].cappers.push(id);
}

module.exports = {
    items: beacons,
    update: update,
    addUser: addUser
}
