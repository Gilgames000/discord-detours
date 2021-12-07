# Discord Detours
Discord Detours is a package that helps you find,
call, and hook into Discord client's functions.  
This is intended to be used with tools like
[Puppeteer](https://github.com/puppeteer/puppeteer)
which let you programmatically control a browser
instance and run JavaScript code in its context.
You can also inject [`api.js`](https://github.com/Gilgames000/discord-detours/blob/master/api.js)
into Discord using an extension like
[Inject Code](https://chrome.google.com/webstore/detail/inject-code/gpaakhhkcmlenabckmapmlfnajboobbi)
directly from your browser.

## Installation
```npm
npm install @gilgames/discord-detours
```

## API reference
#### Utility functions for injecting the code (to be used with Puppeteer)
- `detours.serializeModule(module)`: serializes a module into a string (`JSON.stringify` is no good as it won't serialize functions)
- `detours.injectModule(serializedModule[, name])`: injects a serialized module into `window.name` (`name`defaults to `discordDetours` if not specified)

#### APIs for finding functions and modules
- `detours.api.getAllModules()`: returns a list of all modules
- `detours.api.findModuleByFunctionName(name)`: returns a module by function name
- `detours.api.findFunctionByName(name)`: returns a function by name
- `detours.api.findFunctionsMatchingPattern(pattern)`: returns a list of functions matching a regex pattern
  
#### APIs for hooking/detouring functions
*Will be added in the future.*

## Usage
#### Puppeteer
```js
const detours = require("@gilgames/discord-detours");

// Open the browser with Puppeteer, navigate to Discord, and login
// ...

// Execute the code in the browser's context using Puppeteer's `page.evaluate`
const serializedAPI = detours.serializeModule(detours.api);
await page.evaluate(detours.injectModule, serializedAPI);

// Call any Discord function
const token = await page.evaluate(() => window.discordDetours.findFunctionByName("getToken")());
console.log(token);

```

#### Using your browser
First you have to install an extension that lets
you inject code into a webpage. Then, navigate to
Discord's website, login, and inject the code that
you can find in the [`api.js`](https://github.com/Gilgames000/discord-detours/blob/master/api.js)
file, bar the module export at the bottom. You can
now call the API functions described in the usage
section directly from the console of your browser. 
