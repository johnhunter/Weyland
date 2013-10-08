---
title: Docs - Weyland build configuration
layout: docs
tags: ['docs','weyland','build',configuration']
---
# Weyland build configuration

The Weyland build tool is configured from a configuration file, by default named `weyland-config.js` in the directory where `weyland build` is invoked. The location of this file can also be specified with a config argument:

```shell
weyland build --config d:\path\to\weyland-config.js
```

The Weyland build will run specified tasks against the `src` diectory, clear down the build directory and copy the src files to it.

## Configuration file options

The config file is itself a module with one function `config` that is passed a Weyland DSL object. You can chain its methods to build up your configuration. Call the `weyland.build(&lt;name&gt;)` to get the builder object for a build called 'name'.

### Builder methods

#### .workingDirectory('&lt;path&gt;')
Define a custom working directory - the root of the project. Must be an absolute path. Defaults to the directory where weyland is invoked.

#### .buildDirectory('&lt;path&gt;') [new]
Define a custom build directory path. Can be relative to the current working directory or absolute. Default is `build`.

#### .task.&lt;taskname&gt;({config})
Define the configuration for a task (currently jshint, uglifyjs and rjs are supported).

**Example:**
```js
weyland.build('main')
  .workingDirectory('d:/dev/other/project/src')
  .buildDirectory('../deploy')
  .task.jshint({})
  .task.rjs({...})
  .task.uglifyjs({
    include:['app/**/*.js', 'lib/durandal/**/*.js']
  });
````
