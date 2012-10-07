# CleverRulio
#### *A Rulio module that makes him...Clever*

====

## Install

One day, I'll have the time to `npm publish` CleverRulio. Then, you'll be able to install CleverRulio by running this on your Rulio folder:

    npm install cleverrulio

Until then, you can use it the same way you would if you were developing for it -- with [npm link](https://npmjs.org/doc/link.html). And maybe you can make a contribution!

#### Install with npm link

    git clone git://github.com/foliveira/clever-rulio.git cleverrulio
    cd cleverrulio
    npm link
    
Then, in your Rulio folder:

    npm link cleverrulio

This will create a symlink in node_modules to the repo you cloned, and Node.js will be able to load it like any installed npm module. And this way you can change cleverrulio and have Rulio know about those changes instantly. 

## Tell Rulio to load CleverRulio

Add `cleverrulio` to your Rulio `config.json` modules list.
    
## License

BSD