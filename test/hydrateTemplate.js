'use strict';

const expect = require('code').expect;   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

const HydrateTemplate = require('../src/hydrateTemplate');

describe('HydrateTemplate', () => {

    it('should handle a simple string', (done) => {

        const template = 'not a template';
        const data = {};
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal(template);
        done();
    });

    it('should handle a simple template string', (done) => {

        const template = '{{=it.name}}';
        const data = {
            name: 'dataName'
        };
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal(data.name);
        done();
    });

    it('should handle an object with non-template properties', (done) => {

        const template = {
            name: 'non-templated Name'
        };
        const data = {};
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal(template);
        done();
    });

    it('should handle an object with template properties', (done) => {

        const template = {
            name: '{{=it.rawName}}'
        };
        const data = {
            rawName: 'templated Name'
        };
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal({
            name: data.rawName
        });
        done();
    });

    it('should handle an object with both template and non-template properties', (done) => {

        const template = {
            name : '{{=it.rawName}}',
            title: 'the title'
        };
        const data = {
            rawName: 'templated Name'
        };
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal({
            name : data.rawName,
            title: 'the title'
        });
        done();
    });

    it('should handle nested objects', (done) => {

        const template = {
            name : '{{=it.rawName}}',
            title: 'the title',
            meta : {
                stuff     : '{{=it.rootStuff}}',
                innerStuff: '{{=it.inner.stuff}}'
            }
        };
        const data = {
            rawName  : 'templated Name',
            rootStuff: 'this is the root stuff',
            inner    : {
                stuff: 'this is the inner stuff'
            }
        };
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal({
            name : data.rawName,
            title: 'the title',
            meta : {
                stuff: 'this is the root stuff',
                innerStuff: 'this is the inner stuff'
            }
        });
        done();
    });

    it('should handle arrays', (done) => {

        const template = {
            array: [
                '{{=it.item1}}',
                '{{=it.item2}}',
                true,
                {
                    item3: '{{=it.item3}}'
                }
            ]
        };
        const data = {
            item1: 'templated item 1',
            item2: 'templated item 2',
            item3: 'templated item 3'
        };
        const hydratedTemplate = HydrateTemplate(template, data);

        expect(hydratedTemplate).to.equal({
            array: [
                'templated item 1',
                'templated item 2',
                true,
                {
                    item3: 'templated item 3'
                }
            ]
        });
        done();
    });
});
