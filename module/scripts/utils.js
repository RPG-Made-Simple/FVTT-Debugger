////////////////////////////////////////////////////////////////////////////////
//                 _____       _                                              //
//                |  __ \     | |                                             //
//                | |  | | ___| |__  _   _  __ _  __ _  ___ _ __              //
//                | |  | |/ _ \ '_ \| | | |/ _` |/ _` |/ _ \ '__|             //
//                | |__| |  __/ |_) | |_| | (_| | (_| |  __/ |                //
//                |_____/ \___|_.__/ \__,_|\__, |\__, |\___|_|  LIBRARY       //
//                                          __/ | __/ |           By ZotyDev  //
///////////////////////////////////////////|___//|___///////////////////////////
// ? This class contains utility methods.
export class Utils {
    ////////////////////////////////////////////////////////////////////////////
    // Checks if folder exists
    ////////////////////////////////////////////////////////////////////////////
    static async DoesFolderExist(path) {
        const indexOfName = path.lastIndexOf('/') + 1;
        const folderName = path.slice(indexOfName);
        const pathName = path.slice(0, indexOfName - 1);
        const folders = await FilePicker.browse('data', pathName);
        return (folders.dirs.includes(path.slice(2)));
    }

    ////////////////////////////////////////////////////////////////////////////
    // Create a folder if it does not exist yet
    ////////////////////////////////////////////////////////////////////////////
    static async MakeSureFolder(path) {
        if (!await Utils.DoesFolderExist(path)) {
            console.info(`Utils.MakeSureFolder: "${path}" folder doesn't exist, creating it...`);
            await FilePicker.createDirectory('data', path);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Get time as HH:MM:SS
    ////////////////////////////////////////////////////////////////////////////
    static getTime() {
        const now = new Date();
        const time = now.toTimeString().slice(0, 8);
        const milliseconds = now.getMilliseconds();

        return `${time}.${milliseconds.toString().padStart(3, '0')}`;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Stringfies the arguments
    ////////////////////////////////////////////////////////////////////////////
    static argStringfy() {
        let result = '';

        for (let i = 0; i < arguments.length; i++) {
            let arg = arguments[i];

            // Verifies if arg is a not null object
            if (typeof arg === 'object' && arg !== null) {
                try {
                    // Tries to convert the object into a JSON string
                    arg = `\n${JSON.stringify(arg)}`;
                } catch (error) {
                    // If not possible, convert the object into a default
                    // representation
                    arg = '\n[Object]';
                }
            } else {
                // If the arg is not a object just convert it to string
                arg = String(arg);
            }

            result += arg;

            // Adds a whitespace between args
            if (i < arguments.length - 1) {
                result += ' ';
            // If not between args, add a breakline
            } else {
                result += '\n'
            }
        }

        return result;
    }
}
