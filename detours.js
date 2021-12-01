_fetchModules = function () {
    this.modules = [];
    window.webpackChunkdiscord_app.push([[''], {}, e => {for (let c in e.c) this.modules.push(e.c[c])}]);
}

getAllModules = function () {
    if (void 0 === this.modules) {
        this._fetchModules();
    }
    return this.modules;
}

findModuleByFunctionName = function (name) {
    const modules = this.getAllModules();
    for (const m of modules) {
        e = m?.exports;
        if (!e) continue;
        if (typeof e.default?.[name] === 'function') return e.default;
        if (typeof e[name] === 'function') return e;
    }
};

findFunctionByName = function (name) {
    const functionModule = this.findModuleByFunctionName(name);
    return functionModule?.[name]?.bind(functionModule);
};

findFunctionsMatchingPattern = function (pattern) {
    const matches = {}
    const modules = this.getAllModules();
    modules.forEach(m => {
        e = m?.exports;
        d = e?.default;
        e && Object.keys(e).forEach(i => RegExp(pattern, "i").test(i) && typeof e[i] === 'function' && (matches[i] = (matches[i] || []).concat(e[i].bind(e))));
        d && Object.keys(d).forEach(i => RegExp(pattern, "i").test(i) && typeof d[i] === 'function' && (matches[i] = (matches[i] || []).concat(d[i].bind(d))));
    });
    return matches;
}

module.exports = {
    _fetchModules,
    getAllModules,
    findModuleByFunctionName,
    findFunctionByName,
    findFunctionsMatchingPattern
};
