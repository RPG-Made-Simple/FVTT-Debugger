## Debugger
```js
new Debugger(moduleId: String, prefix: String, should_debug: Boolean - optional,
  should_save: Boolean - optional) -> Debugger
```
- `moduleId` - `id` of your module
- `prefix` - Prefix for the `Debugger`
- `should_debug` - Defines if the created Debugger will output to the browser console
  - Defaults to `false`
- `should_save` - Defines if the created debugger will **save** the logs somewhere in `file` format
  - Defaults to `false`
  - Note that this will not save files by itself, it will only save the logs in the internal memory, files only get created by [`dump()`](#dump) or [`dumpAll()`](#dump-all)

!> This is the `Debugger` constructor, you should use **the returned** value forever for the passed module, never create two Debuggers for the same module!!

```js
// This is how Debugger creates a Debugger for itself
const D = new ('debugger', '🕷️ Debugger', true, false);
```
This will create a `Debugger` that only outputs to console. Any attempts to use [`dump()`](#dump) with this `Debugger` will not work since logs made while `should_save` is `false` don not get saved at all, so there is no data to dump.

## Should Debug (Global)
```js
Debugger.shouldDebugGlobal(should_debug: Boolean) -> void
```
```js
// Example
// Here we are calling the module API, not the Debugger that you created
Debugger.shouldDebugGlobal(false);
// Will disable Debugger globally
```

Setting this to `false` will completely disable all functionalities of the module until it gets set to `true`.

## Should Debug
```js
Debugger.shouldDebug(should_debug: Boolean) -> void
```
```js
// Example
const D = new ('debugger', '🕷️ Debugger', true, false);

// ...

D.shouldDebug(false);
// Will disable debugging for this Debugger
```
Defines if the `Debugger` instance should output logs to console.

## Should Save
```js
Debugger.shouldSave(should_save: Boolean) -> void
```
```js
// Example
const D = new ('debugger', '🕷️ Debugger', true, false);

// ...

D.shouldSave(true);
// Will enable saving logs for this Debugger
```
Defines if the `Debugger` instance should save logs to be dumped later.

## Log
```js
Debugger.log(...params) -> void
```
Acts like a `console.log()`, but with timestamps on the saved files

## Info
```js
Debugger.info(...params) -> void
```
Acts like a `console.info()`, but with a prefix on console and timestamps on the saved files

## Warn
```js
Debugger.warn(...params) -> void
```
Acts like a `console.warn()`, but with a prefix on console and timestamps on the saved files

## Error
```js
Debugger.error(...params) -> void
```
Acts like a `console.error()`, but with a prefix on console and timestamps on the saved files

## Dump
```js
async Debugger.dump() -> Promise<void>
```
```js
// Example
const D = new ('debugger', '🕷️ Debugger', true, true);
// Note that `should_save` is `true`

// ...
await D.dump();
// Will dump the logs of the '🕷️ Debugger' module as a download, if possible
// will save a file to `./debugger/debugger_log.json`
```
Will download a file named `<module>.log`. If the user has enough permission, the log file will also be saved at `./debugger/<module>_log.json`.

## Dump All
```js
async Debugger.dumpAll() -> Promise<void>
```
```js
// Example
// Here we are calling the module API, not the Debugger that you created
Debugger.dumpAll()
// Wil dump all the registered debuggers to the './debugger' folder
```
Will call [`dump()`](#dump) for all the currently registered Debuggers.
