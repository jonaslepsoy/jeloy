
var beacons = {};

var beaconNames = [
  'Kjeller',
  'Lima',
  'Kjeller 2',
  'Shanghai'
];

var initBeacons = function() {
  beaconNames.forEach(function(beacon) {
    beacons[beacon] = {
        score: 0,
        cappers: [],
        cappedby: 0
    };
  });
}

initBeacons();

function update(teams) {
  var t = new Date();

  for (var beacon in beacons) {
    debugger;
    var blue = 0;
    var red = 0;
    var blueRolesOnBeacon = [];
    var redRolesOnBeacon = [];
    for(var i = 0;i < beacons[beacon].cappers.length;i++){
      var capperid = beacons[beacon].cappers[i];
      var role = assignedRoles[capperid];
      console.log(capperid);
      console.log('Red: ', teams.red.players.indexOf(capperid) > -1);
      console.log('Blue: ', teams.blue.players.indexOf(capperid) > -1);
      if(teams.red.players.indexOf(capperid) > -1) {
        redRolesOnBeacon.push(role);
        if (!(beacons[beacon].score < 0 && role ==="King")) {
          red++;
        }
      }
      if (teams.blue.players.indexOf(capperid) > -1) {
        blueRolesOnBeacon.push(role);
        if (!(beacons[beacon].score > 0 && role ==="King")) {
          blue++;
        }
      }
    }
    if(red > blue){
      if(beacons[beacon].score < 100) {
        if (redRolesOnBeacon.indexOf("King") >= 0 && beacons[beacon].score >= 0) {
          beacons[beacon].score+=40;
        }
        beacons[beacon].score+=10;
        if (beacons[beacon].score > 100) { beacons[beacon].score = 100 }
      }
    } else if (red < blue) {
      if(beacons[beacon].score > -100) {
        if (blueRolesOnBeacon.indexOf("King") >= 0 && beacons[beacon].score <= 0) {
          beacons[beacon].score-=40;
        }
        beacons[beacon].score-=10;
        if (beacons[beacon].score < -100) { beacons[beacon].score = -100 }
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

    if (beacons[beacon].cappedby == 1) {
      teams.red.score++;
    } else if (beacons[beacon].cappedby == -1) {
      teams.blue.score++;
    }
    // We have counted the score for this tick, reset cap
    beacons[beacon].cappers = [];
  }
  console.log('red:' +teams.red.score);
  console.log('blue:' +teams.blue.score);
}

function addUser(beaconName, id) {
    console.log(id, beaconName);
    beacons[beaconName].cappers.push(id);
    console.log(beacons);
}

module.exports = {
    items: beacons,
    initBeacons: initBeacons,
    update: update,
    addUser: addUser
}
