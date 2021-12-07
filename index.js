const serialize = require("javascript-serialize");
const detours = require("./api.js");

serializeModule = function (moduleToSerialize) {
    return serialize(moduleToSerialize);
}

injectModule = function (serializedModule) {
    let moduleToInject = eval("(" + serializedModule + ")");
    window.discordDetours = window.discordDetours ?? {};
    for (const fn in moduleToInject) {
        window.discordDetours[fn] = eval("(" + moduleToInject[fn] + ")");
    }
}

module.exports = {
    serializeModule,
    injectModule,
    detours,
};
