const serialize = require("javascript-serialize");
const api = require("./api.js");

serializeModule = function (moduleToSerialize) {
    return serialize(moduleToSerialize);
}

injectModule = function (serializedModule, moduleName = "discordDetours") {
    let moduleToInject = eval("(" + serializedModule + ")");
    window[moduleName] = window[moduleName] ?? {};
    for (const fn in moduleToInject) {
        window[moduleName][fn] = eval("(" + moduleToInject[fn] + ")");
    }
}

module.exports = {
    serializeModule,
    injectModule,
    api,
};
