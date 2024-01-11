## Debugger
```js
Debugger(moduleId, prefix, should_debug, should_save)
```
- `moduleId` - A `string` that defines `id` of your module
- `prefix` - A `string` that defines the prefix for the `Debugger`
- `should_debug` (optional) - A `boolean` that defines if the created debugger will output to the browser console
  - Defaults to `false`
- `should_save` (optional) - A `boolean` that defines if the created debugger will **save** the logs somewhere in `file` format
  - Defaults to `false`
  - Note that this will not save files by itself, it will only save the logs in the internal memory, files only get created by [`dump()`](#dump) or [`dumpAll()`](#dump-all)

This is the `Debugger` constructor, you should use **the returned** value forever for the passed module, never create two Debuggers for the same module!!

```js
// This is how Debugger creates a Debugger for itself
const D = new ('debugger', '🕷️ Debugger', true, false);
```
This will create a `Debugger` that only outputs to console. Any attempts to use [`dump()`](#dump) with this `Debugger` will not work since logs made while `should_save` is `false` don not get saved at all, so there is no data to dump.

## Should Debug (Global)
```js
// Here we are calling the module API, not the Debugger that you created
Debugger.shouldDebugGlobal(should_debug)
```
- `should_debug` - A `boolean` that defines if **Debugger** will be disabled or not, setting this to `false` will completely disable all functionalities of the module until it gets set to `true`

## Should Debug
```js
D.shouldDebug(should_debug)
```
- `should_debug` - A `boolean` that defines if the `Debugger` should output logs to console

## Should Save
```js
D.shouldSave(should_save)
```
- `should_save` - A `boolean` that defines if the `Debugger` should save logs to be dumped later

## Log
```js
D.log(params)
```
Acts like a `console.log()`, but with timestamps on the saved files

## Info
```js
D.info(params)
```
Acts like a `console.info()`, but with a prefix on console and timestamps on the saved files

## Warn
```js
D.warn(params)
```
Acts like a `console.warn()`, but with a prefix on console and timestamps on the saved files

## Error
```js
D.error(params)
```
Acts like a `console.error()`, but with a prefix on console and timestamps on the saved files

## Dump
```js
D.dump()
```
Will download a file named `<module>.log`, if the user has enough permission, the log file will also be saved at `./debugger/<module>_log.json`

## Dump All
```js
// Here we are calling the module API, not the Debugger that you created
Debugger.dumpAll()
```
Will call [`dump()`](#dump) for all the modules currently using **Debugger**
