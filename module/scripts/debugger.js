////////////////////////////////////////////////////////////////////////////////
//                 _____       _                                              //
//                |  __ \     | |                                             //
//                | |  | | ___| |__  _   _  __ _  __ _  ___ _ __              //
//                | |  | |/ _ \ '_ \| | | |/ _` |/ _` |/ _ \ '__|             //
//                | |__| |  __/ |_) | |_| | (_| | (_| |  __/ |                //
//                |_____/ \___|_.__/ \__,_|\__, |\__, |\___|_|  LIBRARY       //
//                                          __/ | __/ |           By ZotyDev  //
///////////////////////////////////////////|___//|___///////////////////////////
// ? Main class of the library.
import { Constants as C } from './constants.js';
import { Utils } from './utils.js'

/**
 * @module Debugger
 * @description This is the main module of Debugger.
 * <b>It has all the API methods that will be exposed.</b>
 *
 * @author ZotyDev
 */
export class Debugger {
    static SHOULD_DEBUG = true;
    static debuggers = [];

    /**
     * @description Creates a Debugger instance.
     * @param {String} module
     * @param {String} prefix
     * @param {Boolean} should_debug
     * @param {Boolean} should_save
     * @returns
     */
    constructor(module, prefix, should_debug, should_save) {
        // Check if the module parameter is valid
        if (foundry.utils.isEmpty(module)) {
            console.error(`[${C.NAME}] "module" is missing`);
            return;
        }
        if (!game.modules.has(module) || !game.modules.get(module).active) {
            console.error(`[${C.NAME}] "module" must refer to a valid loaded module`);
            return;
        }

        // Add the module to the debugger
        this.module = module;

        // Add the prefix
        if (foundry.utils.isEmpty(prefix)) {
            this.prefix = '';
        } else {
            this.prefix = `[${prefix}]`;
        }

        // Should debug
        if (foundry.utils.isEmpty(should_debug)) {
            this.should_debug = false;
        } else {
            this.should_debug = should_debug;
        }

        // Should save
        if (foundry.utils.isEmpty(should_save)) {
            this.should_save = false;
        } else {
            this.should_save = should_save;
        }

        this._log = '';

        console.info(`[${C.NAME}] registered a Debugger for the "${module}" module`);

        Debugger.debuggers.push(this);
    }

    /**
     * @description Sets whether or not Debugger will be enabled globally
     * @param {Boolean} should_debug
     */
    static shouldDebugGlobal(should_debug) {
        Debugger.SHOULD_DEBUG = should_debug;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Should debug (module)
    ////////////////////////////////////////////////////////////////////////////
    shouldDebug(should_debug) {
        this.should_debug = should_debug;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Should save
    ////////////////////////////////////////////////////////////////////////////
    shouldSave(should_save) {
        this.should_save = should_save;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Log
    // ? Idk why by if there is not character where the '>' is, the log outputs
    // ? a <empty_string>, which is very annoying
    ////////////////////////////////////////////////////////////////////////////
    log(...params) {
        if (Debugger.SHOULD_DEBUG && this.should_debug) {
            console.log(`${this.prefix}>`, ...params);
        }

        if (Debugger.SHOULD_DEBUG && this.should_save) {
            this._log += Utils.argStringfy(...params);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Info
    ////////////////////////////////////////////////////////////////////////////
    info(...params) {
        if (Debugger.SHOULD_DEBUG && this.should_debug) {
            console.info(`${this.prefix}[INFO]`, ...params);
        }

        if (Debugger.SHOULD_DEBUG && this.should_save) {
            this._log += Utils.argStringfy(`[${Utils.getTime()}][INFO]`, ...params);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Warn
    ////////////////////////////////////////////////////////////////////////////
    warn(...params) {
        if (Debugger.SHOULD_DEBUG && this.should_debug) {
            console.warn(`${this.prefix}[WARN]`, ...params);
        }

        if (Debugger.SHOULD_DEBUG && this.should_save) {
            this._log += Utils.argStringfy(`[${Utils.getTime()}][WARN]`, ...params);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Error
    ////////////////////////////////////////////////////////////////////////////
    error(...params) {
        if (Debugger.SHOULD_DEBUG && this.should_debug) {
            console.error(`${this.prefix}[ERROR]`, ...params);
        }

        if (Debugger.SHOULD_DEBUG && this.should_save) {
            this._log += Utils.argStringfy(`[${Utils.getTime()}][ERROR]`, ...params);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Dump the log to a file
    ////////////////////////////////////////////////////////////////////////////
    async dump() {
        // Check if current user has enough permissions to dump logs
        if (game.permissions.FILES_BROWSE.includes(game.user.role) && game.permissions.FILES_UPLOAD.includes(game.user.role)) {
            // Make sure the debugger folder exists
            Utils.MakeSureFolder('./debugger');

            // Upload to server
            const newFile = new File([this._log], `${this.module}_log.json`, { type: 'application/json' });
            await FilePicker.upload('data', './debugger', newFile, {}, { notify: false });

        } else {
            console.error(`[${C.NAME}] current user lacks enough permission to dump log to file`);
        }

        // Download log
        saveDataToFile(this._log, 'application/json', `${this.module}.log`);
    }

    ////////////////////////////////////////////////////////////////////////////
    // Dump all logs
    ////////////////////////////////////////////////////////////////////////////
    static async dumpAll() {
        for (const debug of Debugger.debuggers) {
            await debug.dump();
        }
    }
}
