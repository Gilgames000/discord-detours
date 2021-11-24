getAllModules = function () {
    return (window.webpackChunkdiscord_app.push([[''], {}, e => {m = []; for (let c in e.c) m.push(e.c[c])}]), m);
}

findModuleByFunctionName = function (name) {
    modules = this.getAllModules();
    for (const m of modules) {
        e = m?.exports;
        if (!e) continue;
        if (typeof e.default?.[name] === 'function') return e.default;
        if (typeof e[name] === 'function') return e;
    }
};

findFunctionByName = function (name) {
    functionModule = this.findModuleByFunctionName(name);
    return functionModule?.[name]?.bind(functionModule);
};

findFunctionsMatchingPattern = function (pattern) {
    matches = {}
    modules = this.getAllModules();
    modules.forEach(m => {
        e = m?.exports;
        d = e?.default;
        e && Object.keys(e).forEach(i => RegExp(pattern, "i").test(i) && typeof e[i] === 'function' && (matches[i] = (matches[i] || []).concat(e[i].bind(e))));
        d && Object.keys(d).forEach(i => RegExp(pattern, "i").test(i) && typeof d[i] === 'function' && (matches[i] = (matches[i] || []).concat(d[i].bind(d))));
    });
    return matches;
}


module.exports = {
    getAllModules,
    findModuleByFunctionName,
    findFunctionByName,
    findFunctionsMatchingPattern
};
