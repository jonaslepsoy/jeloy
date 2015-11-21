var http = require('http').Server();
var io = require('socket.io')(http);
var uuid = require('node-uuid');

// Init teams and the server
function init() {
  var teams = {
    "red":  {
      "score": 0,
      "players": []
    },
    "blue": {
      "score": 0,
      "players": []
    }
  };

  var beacons = [
    {
      "name":   "Buenos Aires",
      "score":  0
    },
    {
      "name": "Living room west",
      "score":  0
    },
    {
      "name": "Lima",
      "score":  0
    },
    {
      "name": "Living room north",
      "score":  0
    },
    {
      "name": "Santiago",
      "score":  0
    },
    {
      "name": "Kjeller",
      "score":  0
    },
    {
      "name": "poop",
      "score":  0
    },
    {
      "name": "Shanghai",
      "score":  0
    },
    {
      "name": "Living room south",
      "score":  0
    },
    {
      "name": "Living room east",
      "score":  0
    },
    {
      "name": "Gang",
      "score":  0
    },
    {
      "name": "Blomster",
      "score":  0
    }
  ];

  // Set up Socket.IO to listen on port 8000
	socket = io.listen(8000);

	// Start listening for events
	setEventHandlers();
}

var setEventHandlers = function() {
	// Socket.IO must do stuff
	socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
	util.log("New player has connected: "+client.id);

	// Listen for client disconnected
	client.on("disconnect", onClientDisconnect);

	// Listen for new player message
	client.on("new player", onNewPlayer);

  client.on("list beacons", listBeacons);
};

// Socket client has disconnected
function onClientDisconnect() {
	util.log("Player has disconnected: "+this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	// Remove player from players array
	// TODO: Remove player from team
  //players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
  var id = uuid.v1();
  if(teams.red.players.length > teams.blue.players.length) {
    teams.blue.players.push(id);
    this.broadcast.emit('new player',{'msg': 'joined team blue','id': id});
  } else {
    teams.red.players.push(id);
    this.broadcast.emit('new player',{'msg': 'joined team red','id': id});
  }
  console.log(teams);
}

// Client wishes to list beacons
function listBeacons(msg){
    this.broadcast.emit('list beacons',beacons);
    console.log(beacons);
}

// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};

	return false;
};

init();
