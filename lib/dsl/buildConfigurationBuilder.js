var TaskConfigurationHook = require('./taskConfigurationHook');

var ctor = function(name){
    this.config = {
        name:name,
        tasks:[]
    };

    this.task = new TaskConfigurationHook(this);
};

ctor.prototype.workingDirectory = function(dir){
    this.config.workingDirectory = dir;
    return this;
};

ctor.prototype.buildDirectory = function(dir){
    this.config.buildDirectory = dir;
    return this;
};


module.exports = ctor;