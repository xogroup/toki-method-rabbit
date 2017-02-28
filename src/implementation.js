'use strict';

const BunnyBus = require('bunnybus');
const HydrateTemplate = require('./hydrateTemplate');

//export result here
module.exports = function () {

    const self = this;

    if (!self.config.rabbitConfiguration) {
        throw new Error('toki-method-rabbit action configuration must include RabbitMQ configs');
    }

    if (!self.config.createConfiguration) {
        throw new Error('toki-method-rabbit action configuration must include message mapping configs');
    }

    const bunnyBus = new BunnyBus(self.config.rabbitConfiguration);
    const rabbitMessage =  HydrateTemplate(self.config.createConfiguration, self.contexts);

    return bunnyBus.publish(rabbitMessage)
        .then(() => {

            return rabbitMessage;
        });
};
