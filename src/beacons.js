
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
      cappers: [],
      cappedby: 0
  };
});

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
      if(beacons[beacon].score < 100) {
        beacons[beacon].score+=10;
      }
    } else if (red < blue) {
      if(beacons[beacon].score > -100) {
        beacons[beacon].score-=10;
      }
    }

    var score = beacons[beacon].score;
    var cappedby = beacons[beacon].cappedby;
    if (score >= 100) {
      beacons[beacon].cappedby = 1;
    } else if (score <= -100) {
      beacons[beacon].cappedby = -1;
    } else if (score <= 0 && cappedby==1) {
      beacons[beacon].cappedby = 0;
    } else if (score >= 0 && cappedby==-1) {
      beacons[beacon].cappedby = 0;
    }
    console.log('Score for ' + beacon + ' is ' + beacons[beacon].score);
    // We have counted the score for this tick, reset cap
    beacons[beacon].cappers = [];
  }

}

function addUser(beaconName, id) {
    console.log(id, beaconName);
    beacons[beaconName].cappers.push(id);
    console.log(beacons);
}

module.exports = {
    items: beacons,
    update: update,
    addUser: addUser
}
