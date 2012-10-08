# CleverRulio
#### *A Rulio module that makes him...Clever*

====

## Install

Just run  on your Rulio folder:

    npm install cleverrulio

And CleverRulio will be installed as a node module for Rulio.

Alternatively, if you are developing around CleverRulio, you could:

#### Install with npm link

    git clone git://github.com/foliveira/clever-rulio.git cleverrulio
    cd cleverrulio
    npm link
    
Then, in your Rulio folder:

    npm link cleverrulio

This will create a symlink in node_modules to the repo you cloned, and node.js will be able to load it like any installed npm module. And this way you can change cleverrulio and have Rulio know about those changes instantly. 

## Tell Rulio to load CleverRulio

Add `cleverrulio` to your Rulio `config.json` modules list.
    
## License

BSD