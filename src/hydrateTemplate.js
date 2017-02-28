'use strict';

const Dot = require('dot');

module.exports = function hydrateTemplate(template, data) {

    if (typeof template === 'string') {
        return Dot.template(template)(data);
    }
    else if (typeof template === 'object' && !Array.isArray(template)) {
        Object.keys(template).forEach((templateProperty) => {

            template[templateProperty] = hydrateTemplate(template[templateProperty], data);
        });
    }
    else if (Array.isArray(template)) {
        template = template.map((item) => {

            return hydrateTemplate(item, data);
        });
    }

    return template;
};
