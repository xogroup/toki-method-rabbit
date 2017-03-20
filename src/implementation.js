'use strict';

const BunnyBus = require('bunnybus');
const HydrateTemplate = require('toki-templater');

//export result here
module.exports = function () {

    const self = this;

    if (!self.config.rabbitConfiguration) {
        throw new Error('toki-method-rabbit action configuration must include RabbitMQ configs');
    }

    if (!self.config.inputConfiguration) {
        throw new Error('toki-method-rabbit action configuration must include message mapping configs');
    }

    const bunnyBus = new BunnyBus(self.config.rabbitConfiguration);
    let rabbitMessage;

    return HydrateTemplate(self.config.inputConfiguration, null, {
        context: self.contexts
    })
        .then((hydratedConfig) => {

            rabbitMessage = hydratedConfig;

            return bunnyBus.publish(rabbitMessage);
        })
        .then(() => {

            return rabbitMessage;
        });
};
