'use strict';

const expect = require('code').expect;   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const it = lab.it;

const BunnyBus = require('bunnybus');
let bunnyBus;

const TokiRabbit = require('../src/implementation');

describe('toki-method-rabbit', () => {

    before((done) => {

        bunnyBus = new BunnyBus({
            user    : 'notGuest',
            password: 'notGuest'
        });
        done();
    });

    it('should configure BunnyBus via action configuration', () => {

        const context = {
            config: {
                rabbitConfiguration: {
                    user    : 'guest',
                    password: 'guest'
                },
                inputConfiguration: {
                    event: 'toki.request-processed'
                }
            }
        };

        return TokiRabbit.call(context)
            .then(() => {

                expect(bunnyBus.connectionString).to.equal('amqp://guest:guest@127.0.0.1:5672/%2f?heartbeat=2000');
            });
    });

    it('should error on missing BunnyBus action configuration', (done) => {

        const context = {
            config: {}
        };

        expect(TokiRabbit.bind(context)).to.throw(Error, 'toki-method-rabbit action configuration must include RabbitMQ configs');
        done();
    });

    it('should error on missing inputConfiguration', (done) => {

        const context = {
            config: {
                rabbitConfiguration: {}
            }
        };

        expect(TokiRabbit.bind(context)).to.throw(Error, 'toki-method-rabbit action configuration must include message mapping configs');
        done();
    });

    it('should use the inputConfiguration to build the rabbit message', () => {

        const context = {
            config: {
                rabbitConfiguration: {
                    user: 'guest',
                    password: 'guest'
                },
                inputConfiguration: {
                    event  : 'toki.request-processed',
                    action1: {
                        uri       : '{{=it.action1.output.uri}}',
                        httpAction: 'POST'
                    },
                    message: {
                        uri       : '{{=it.action2.output.message.uri}}',
                        httpAction: 'POST'
                    }
                }
            },
            contexts: {
                action1: {
                    server: {},
                    config: {},
                    contexts: {},
                    output: {
                        uri: 'endpointA/12345'
                    }
                },
                action2: {
                    server: {},
                    config: {},
                    contexts: {},
                    output: {
                        message: {
                            uri: 'message/67890'
                        }
                    }
                }
            }
        };

        return TokiRabbit.call(context)
            .then((message) => {

                expect(message).to.equal({
                    event  : 'toki.request-processed',
                    action1: {
                        uri       : 'endpointA/12345',
                        httpAction: 'POST'
                    },
                    message: {
                        uri       : 'message/67890',
                        httpAction: 'POST'
                    }
                });
            });
    });

    it('should emit the rabbit message with the expected routeKey', (done) => {

        bunnyBus.subscribe('toki', {
            'toki.test-request-processed' : (message, ack) => {

                ack();
                done();
            }
        })
            .then(() => {

                const context = {
                    config: {
                        rabbitConfiguration: {
                            user: 'guest',
                            password: 'guest'
                        },
                        inputConfiguration: {
                            event  : 'toki.test-request-processed',
                            action1: {
                                uri       : '{{=it.action1.output.uri}}',
                                httpAction: 'POST'
                            },
                            message: {
                                uri       : '{{=it.action2.output.message.uri}}',
                                httpAction: 'POST'
                            }
                        }
                    },
                    contexts: {
                        action1: {
                            server: {},
                            config: {},
                            contexts: {},
                            output: {
                                uri: 'endpointA/12345'
                            }
                        },
                        action2: {
                            server: {},
                            config: {},
                            contexts: {},
                            output: {
                                message: {
                                    uri: 'message/67890'
                                }
                            }
                        }
                    }
                };

                TokiRabbit.call(context);
            });
    });
});
