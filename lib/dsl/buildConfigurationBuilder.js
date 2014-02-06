/*jshint node:true*/
var helper = require('../helpers');
var TaskConfigurationHook = require('./taskConfigurationHook');

var ctor = function(config){
    var defaultConfig = {
        tasks:[]
    };
    // backwards compatibility where the build name was passed in
    if(typeof config === 'string'){
        config = { name: config };
    }

    config.name = config.name || "main";
    config.include = config.include || ["**/*.{js,html}"];
    config.exclude = config.exclude || [];

    var args = Array.prototype.slice.call(arguments);
    args.unshift(defaultConfig);
    args.unshift({}); //target
    this.config = helper.extend.apply(helper, args);

    this.task = new TaskConfigurationHook(this);
};

ctor.prototype.workingDirectory = function(dir){
    this.config.workingDirectory = dir;
    return this;
};

module.exports = ctor;