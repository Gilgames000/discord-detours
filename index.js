const serialize = require("javascript-serialize");
const detours = require("./detours.js");

serializeModule = function (moduleToSerialize) {
    return serialize(moduleToSerialize);
}

injectModule = function (serializedModule) {
    moduleToInject = eval("(" + serializedModule + ")");
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