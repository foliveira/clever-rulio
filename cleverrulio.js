var crypto = require('crypto');
var http = require('http');

function Cleverbot() {
  var that = this;

  function digest(body) {
    var hash = crypto.createHash('md5');
    hash.update(body)
    return hash.digest('hex');
  };

  function encodeParameters(toEncode){
    var encoded = [];

    for (x in toEncode) {
      if (toEncode[x] instanceof Array) {
        encoded.push(x + "=" + encodeURIComponent(toEncode[x].join(",")));
      }
      else if (toEncode[x] instanceof Object) {
        encoded.push(params(toEncode[x]));
      }
      else {
        encoded.push(x + "=" + encodeURIComponent(toEncode[x]));
      }
    }

    return encoded.join("&");
  };

  var params = {
    'stimulus'          : '', 
    'start'             : 'y', 
    'sessionid'         : '',
    'vText8'            : '', 
    'vText7'            : '', 
    'vText6'            : '',
    'vText5'            : '', 
    'vText4'            : '', 
    'vText3'            : '',
    'vText2'            : '', 
    'icognoid'          : 'wsf', 
    'icognocheck'       : '',
    'fno'               : '0', 
    'prevref'           : '', 
    'emotionaloutput'   : '',
    'emotionalhistory'  : '', 
    'asbotname'         : '', 
    'ttsvoice'          : '',
    'typing'            : '', 
    'lineref'           : '', 
    'sub'               : 'Say',
    'islearning'        : '1', 
    'cleanslate'        : 'false',
  };

  var messageKeys = [
    'message', 
    'sessionid', 
    'logurl', 
    'vText8',
    'vText7', 
    'vText6', 
    'vText5', 
    'vText4',
    'vText3', 
    'vText2', 
    'prevref', 
    '',
    'emotionalhistory', 
    'ttsLocMP3', 
    'ttsLocTXT', 
    'ttsLocTXT3',
    'ttsText', 
    'lineref', 
    'lineURL', 
    'linePOST',
    'lineChoices', 
    'lineChoicesAbbrev', 
    'typingData', 
    'divert'
  ];

  return {
    ask: function(message, answer) {
      var body = params;
      body.stimulus = message;
      body.icognocheck = digest(encodeParameters(body).substring(9, 29));

      var requestOptions = {
        host: 'www.cleverbot.com',
        port: 80,
        path: '/webservicemin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': encodeParameters(body).length
        }
      };

      var req = http.request(requestOptions, function(res) {
        var cb = answer || function() { };
        res.on('data', function(chunk) {
          var chunkData = chunk.toString().split("\r");
          var responseHash = {};

          for (var i = 0, iLen = chunkData.length; i < iLen; i++) {
            params[messageKeys[i]] = responseHash[messageKeys[i]] = chunkData[i];
          }

          cb(responseHash);
        });
      });

      req.write(encodeParameters(body));
      req.end();
    }
  }
};

function clever(irc, conf) {
  var cleverRulio = new Cleverbot();

  irc.addListener('message', function (nick, to, text) {
    var splitMsg = text.split(conf.nick + ':');

    if (splitMsg.length === 1)
      return;

    var msg = splitMsg[1].trim();

    cleverRulio.ask(msg, function(resp) {
       irc.say(to, nick + ': ' + resp.message);
    });
  });
};

module.exports = clever;