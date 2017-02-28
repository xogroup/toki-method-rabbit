# toki-method-rabbit
> RabbitMQ plugin used in Toki core.

This plugin interfaces Toki core with the [BunnyBus](https://github.com/xogroup/bunnybus) RabbitMQ driver.

Lead Maintainer: [Wes Tyler](https://github.com/westyler)

[![npm version](https://badge.fury.io/js/%40toki%2Ftoki-method-rabbit.svg)](https://badge.fury.io/js/toki-method-rabbit)
[![Build Status](https://travis-ci.org/xogroup/toki-method-rabbit.svg?branch=master)](https://travis-ci.org/xogroup/toki-method-rabbit)
[![Known Vulnerabilities](https://snyk.io/test/github/xogroup/toki-method-rabbit/badge.svg)](https://snyk.io/test/github/xogroup/toki-method-rabbit)
[![NSP Status](https://nodesecurity.io/orgs/xo-group/projects/f642dd37-2a46-4ffc-b46c-773f1d1c270c/badge)](https://nodesecurity.io/orgs/xo-group/projects/f642dd37-2a46-4ffc-b46c-773f1d1c270c)

## How to integrate with [Toki](https://github.com/xogroup/toki)

`toki-method-rabbit` is meant to be used as an *action* step in a Toki rules-engine configuration definition.
This method is intended for publishing messages to a RabbitMQ message bus in the course of a Toki process lifecycle.
 Like other `toki-method-*` modules, `toki-method-rabbit` is implemented through the Toki rule configuration. 
 There are 5 required configuration properties for this method:

  1. `"name"`

    {{string}}

    The name of the action step. Eg. `"rabbit"`

  2. `"type"`

    {{string}}

    The type of action to be taken by the Toki rules engine. In this case the value should always be `"toki-method-rabbit"`

  3. `"rabbitCongifuration"`

    {{object}}

    The connection configurations for the RabbitMQ bus being used.

    See the [BunnyBus configurations](https://github.com/xogroup/bunnybus/blob/master/API.md#config) for more information.

  4. `"createConfiguration"`

    {{object}}

    The mapping schema used to create the Rabbit message being published to the exchange.

  5. `"errorConfiguration"`

    {{object}}

    The mapping schema used to create a Rabbit message in the case of an error in the Toki process lifecycle.

<!-- Customize this if needed -->
Examples can be found in [the sample Toki config](test/sample-config.json).
