<a href="https://foundryvtt.com/packages/debugger">
    <p align="center">
        <img src="https://raw.githubusercontent.com/ZotyDev/FoundryVTT-Debugger/main/branding/title.png" alt="Debugger Title">
    </p>
</a>

<p align="center">
    <a href="https://discord.gg/RAgPXB4zG7">
        <img src="https://discord.com/api/guilds/1071251491375042661/widget.png?style=shield"/>
    </a>
</p>

A FoundryVTT library that provides some helper methods to make debugging easier, specially if you want a easy way to **save and analyze individual module logs with a timestamp**.

_Disclaimer: This module is not for everyone, it is something that I created to help me with some complex behaviors that I'm trying to fix in other modules, I don't recommend **Debugger** for simple and/or small modules since it would be like killing a ant with a shotgun. Now, if you find yourself always needing more debugging information and find it hard to spot the logs from your module, then **Debugger** is for you!_

### Note for Developers (modules and macros)
Take a look at the [Documentation](https://docs.rpgmadesimple.com/FVTT-Debugger/)

<a href='https://ko-fi.com/T6T8IFCB5' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi5.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

---
## Supported Versions
- **V11**
- ~~**V12**~~ _as soon as it gets released_

## Main Features
- Create a `Debugger` with prefix and special arguments.
- Save logs at `./debugger/`.
  - All logs saved by doing this contains information **only** from your module.
  - Nothing gets saved/created if not requested.

## Getting Started
First thing you should do is to create a `Debugger`, this is the object that will be used by you to interact with the module.

My example is how I use **Debugger**, you could do exactly like me or in any other way, the only requirement is that a Debugger stays always the same, you only create it one time and reuse it.

```js
// constants.js
export class Constants {
    static D;
}
```

```js
// module.js
import { Constants as C} from "./constants.js"

// I recommend you to depend on 'debugger.ready' instead of 'ready' if you plan
// to set Debugger as a requirement, this way there is no chance of your
// Debugger not being fully configured when used.
Hooks.once('debugger.ready', () => {
    // Please be careful, you want to create a "Debugger" not a "debugger"
    C.D = new Debugger(
        'debugger',     // Module Id
        '🕷️ Debugger',  // Prefix - [🕷️ Debugger][INFO] This is a example
        true, // Should it be logged to terminal? This value defaults to false
        true, // Should it be saved to a log? This value defaults to false
        );

    // Now if we call:
    C.D.info('Hey, this is a test!');
    // Will output:
    // [🕷️ Debugger][INFO] Hey, this is a test!
    //
    // Will save to log:
    // [18:10:54.382][INFO] Hey, this is a test!
})
```

Note that by default `logs` will not be saved on your data, you need to `dump()` your Debugger, or `dumpAll()` to dump all the registered debuggers.

It is **very important** that you pass set `should_debug` (last argument on Debugger creation) as `true` if you want to dump the logs, otherwise you will not benefit from this since **Debugger** only saves when instructed to (to prevent huge useless data being stored, thus making it heavier for the players)

```js
C.D.dump(); // Will dump the saved logs to "./debugger/<module>_log.json"
Debugger.dumpAll(); // Will dump all the Debuggers to "./debugger/"
```

Again, no **folders** or **files** get created unless requested.

As a final note, **do not** ship your module with `should_debug` and `should_save` set to `true`, please include a way for the players to activate/deactivate it. Since it requires permissions to work dump it should only be used by GMs (Making it easier for you (and myself lol) to use **Debugger** is my goal, so the disclaimers and limitations that I'm currently talking about will cease to exist in the near future)
