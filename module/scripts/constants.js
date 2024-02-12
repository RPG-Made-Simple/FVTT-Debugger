////////////////////////////////////////////////////////////////////////////////
//                 _____       _                                              //
//                |  __ \     | |                                             //
//                | |  | | ___| |__  _   _  __ _  __ _  ___ _ __              //
//                | |  | |/ _ \ '_ \| | | |/ _` |/ _` |/ _ \ '__|             //
//                | |__| |  __/ |_) | |_| | (_| | (_| |  __/ |                //
//                |_____/ \___|_.__/ \__,_|\__, |\__, |\___|_|  LIBRARY       //
//                                          __/ | __/ |           By ZotyDev  //
///////////////////////////////////////////|___//|___///////////////////////////
// ? Here are all the constants used by Debugger, all static values are and
// ? should be here.
export class Constants {
  static ID = 'debugger';
  static NAME_FLAT = 'Debugger';
  static NAME = `🕷️ ${Constants.NAME_FLAT}`;
  static LEVEL = {
    LOG: '',
    INFO: '[INFO]',
    WARN: '[WARN]',
    ERROR: '[ERROR]',
  }
}
