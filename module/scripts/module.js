////////////////////////////////////////////////////////////////////////////////
//                 _____       _                                              //
//                |  __ \     | |                                             //
//                | |  | | ___| |__  _   _  __ _  __ _  ___ _ __              //
//                | |  | |/ _ \ '_ \| | | |/ _` |/ _` |/ _ \ '__|             //
//                | |__| |  __/ |_) | |_| | (_| | (_| |  __/ |                //
//                |_____/ \___|_.__/ \__,_|\__, |\__, |\___|_|  LIBRARY       //
//                                          __/ | __/ |           By ZotyDev  //
///////////////////////////////////////////|___//|___///////////////////////////
// ? Debugger provides developers with some helpers to make module debugging
// ? easier. Mainly intented to use for logging.

import { Debugger } from "./debugger.js";
import { Utils } from "./utils.js";

Hooks.on('init', () => {
    Hooks.on('ready', () => {
        // Setup the API
        window['Debugger'] = Debugger;

        // Make sure the required folder exists
        Utils.MakeSureFolder('./debugger');


        const dbg = new Debugger('debugger', '🕷️ Debugger', true, true);
        dbg.info('Ready!');
        dbg.info(`Version ${game.modules.get('debugger').version}`);
        dbg.info('Library By ZotyDev');
        dbg.warn('Beware! Bugs may be present!!');
        dbg.warn('Remember to always pop your groups!');

        Hooks.call('debugger.ready');
    });
});
