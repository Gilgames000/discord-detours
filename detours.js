getAllModules = function () {
    return (webpackChunkdiscord_app.push([[''], {}, e => {m = []; for (let c in e.c) m.push(e.c[c])}]), m);
}

findModuleByFunctionName = function (name) {
    modules = window.discordDetours.getAllModules();
    return modules.find(m => (e = m?.exports) && (typeof e[name] === 'function' || typeof e.default?.[name] === 'function'));
};

findFunctionByName = function (name) {
    functionModule = window.discordDetours.findModuleByFunctionName(name);
    return functionModule?.exports?.default?.[name];
};

findFunctionsMatchingPattern = function (pattern) {
    matches = {}
    modules = window.discordDetours.getAllModules();
    modules.forEach(m => {
        e = m?.exports;
        d = e?.default;
        e && Object.keys(e).forEach(i => RegExp(pattern, "i").test(i) && typeof e[i] === 'function' && (matches[i] = e[i]));
        d && Object.keys(d).forEach(i => RegExp(pattern, "i").test(i) && typeof d[i] === 'function' && (matches[i] = d[i]));
    });
    return matches;
}


module.exports = {
    getAllModules,
    findModuleByFunctionName,
    findFunctionByName,
    findFunctionsMatchingPattern
};
