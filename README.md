# toki-method-rabbit
> RabbitMQ plugin used in Toki core.

This plugin interfaces Toki core with the [BunnyBus](https://github.com/xogroup/bunnybus) RabbitMQ driver.

Lead Maintainer: [Wes Tyler](https://github.com/westyler)

[![npm version](https://badge.fury.io/js/%40toki%2Ftoki-method-rabbit.svg)](https://badge.fury.io/js/toki-method-rabbit)
[![Build Status](https://travis-ci.org/xogroup/toki-method-rabbit.svg?branch=master)](https://travis-ci.org/xogroup/toki-method-rabbit)
[![Known Vulnerabilities](https://snyk.io/test/github/xogroup/toki-method-rabbit/badge.svg)](https://snyk.io/test/github/xogroup/toki-method-rabbit)
[![NSP Status](https://nodesecurity.io/orgs/xo-group/projects/f642dd37-2a46-4ffc-b46c-773f1d1c270c/badge)](https://nodesecurity.io/orgs/xo-group/projects/f642dd37-2a46-4ffc-b46c-773f1d1c270c)

## How to integrate with [Toki](https://github.com/xogroup/toki)

Getting started with RabbitMQ and Toki is a simple 2-step process!
  1. `npm install --save toki-method-rabbit`
  2. Add your `toki-method-rabbit` action configuration to your Toki rules-engine configuration.

That's it! The Toki rules engine handles all of the code `require`ing and context setup behind the scenes, freeing you to focus on more important things.

## toki-method-rabbit Action Configuration Schema
`toki-method-rabbit` is meant to be used as an *action* step in a Toki rules-engine configuration definition.
This method is intended for publishing messages to a RabbitMQ message bus in the course of a Toki process lifecycle.
 Like other `toki-method-*` modules, `toki-method-rabbit` is implemented through the Toki rule configuration. 
 There are 4 required configuration properties for this method:

  1. `"name"`

    {{string}}

    The name of the action step. Eg. `"rabbit"`

  2. `"type"`

    {{string}}

    The type of action to be taken by the Toki rules engine. In this case the value should always be `"toki-method-rabbit"`

  3. `"rabbitConfiguration"`

    {{object}}

    The connection configurations for the RabbitMQ bus being used.

    See the [BunnyBus configurations](https://github.com/xogroup/bunnybus/blob/master/API.md#config) for more information.

  4. `"createConfiguration"`

    {{object}}

    The mapping schema used to create the Rabbit message being published to the exchange. toki-method-rabbit leverages [toki-templater](https://github.com/xogroup/toki-templater) to support dynamic templating in your createConfiguration mappings.

<!-- Customize this if needed -->
Examples can be found in [the sample Toki config](test/sample-config.json).


## Contributing
We love community and contributions! Please check out our [guidelines](http://github.com/xogroup/toki-method-rabbit/blob/master/.github/CONTRIBUTING.md) before making any PRs.

### Setting up for development
Getting yourself setup and bootstrapped is easy.  Use the following commands after you clone down.

```
npm install && npm test
```

Please note that the tests make use of Docker and require the `rabbitmq:3-management` Docker image. Once you have Docker installed, if tests fail then follow these steps:
  1. Ensure that you have the rabbitmq host mappings in your `/env/hosts` file: `127.0.0.1 rabbitmq`
  2. If your tests are able to connect to the Docker image, but you have a `Socket closed abruptly during opening handshake` error, your Docker image may be initializing too slowly. Try increasing the `sleep` delay in the [wait-on-resources file](http://github.com/xogroup/toki-method-rabbit/blob/master/docker/wait-on-resource.sh).
