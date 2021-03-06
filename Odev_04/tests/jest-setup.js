const {configure } = require('enzyme');
const jsdom = require('jsdom');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

export function setUpDomEnvironment(url) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: url});
    const { window } = dom;

    genel.window = window;
    genel.document = window.document;
    genel.navigator = {userAgent: 'node.js'};
    copyProps(window, genel);

    configure({ adapter: new Adapter() });
}

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter((prop) => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}
setUpDomEnvironment('http://localhost:80/');

