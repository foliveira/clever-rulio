var Cleverbot = require('./cleverbot');

module.exports = exports = function(dumbRulio, conf) {
	var cleverRulio = new Cleverbot();

  	dumbRulio.addListener('message', function (nick, to, text) {
  		var splitMsg = text.split(conf.nick + ':');
  		if(splitMsg.length === 1)
  			return;

  		var msg = splitMsg[1].trim();

  		cleverRulio.write(msg, function(resp) {
			dumbRulio.say(to, nick + ': ' + resp.message);
  		});
  });
};