var log = require('npmlog'),
    util = require('util'),
    helper = require('../../helpers'),
    path = require('path');

exports.invoke = function(context){
    var builds = context.config.build,
        originalWorkingDirectory = process.cwd();

    if(!Array.isArray(builds)){
        builds = [builds];
    }

    if(context.options.verbose){
        log.info("build", "config", util.inspect(builds, { depth: null, colors:true }));
    }

    return helper.asyncForEach(builds, function (buildConfig){
        if(buildConfig.workingDirectory){
            process.chdir(buildConfig.workingDirectory);
        }else{
            buildConfig.workingDirectory = process.cwd();
        }

        buildConfig.buildDirectory = path.join(buildConfig.workingDirectory, 'build');
        helper.forceRemoveDirectory(buildConfig.buildDirectory);

        return helper.getFiles(buildConfig).then(function(files){
            return helper.asyncForEach(files, function(src){
                var dest = path.join('build', src);
                return helper.safeCopy(src, dest);
            });
        }).then(function(){
                process.chdir(buildConfig.buildDirectory);
                return helper.asyncForEach(buildConfig.tasks, function(taskConfig){
                    var task = require('../../tasks/' + taskConfig.moduleId);
                    return helper.getFiles(taskConfig).then(function(files){
                        taskConfig.files = helper.distinct(files);
                        return task.build(context, buildConfig, taskConfig);
                    });
                });
            }).then(function(){
                process.chdir(originalWorkingDirectory);
            });
    }).end();
};
