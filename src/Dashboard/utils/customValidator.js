import { buildCommands } from "./BuildCommandsValidation";

export class CustomValidator{
    // build command : command message validator
    static commandMessageValidator = (commandInput) => {
        if(commandInput !== '' || commandInput.length > 0){
            let commandValidOutput = [];
            const getAllCommandsArray = commandInput.split('\n');
            // check for each command as input can contain multiple commands
            for(const commandString of getAllCommandsArray){
                if(commandString !== ''){
                    // get substring after specific character
                    const substringAfterCharacter = commandString.split(':')[1];
                    if(substringAfterCharacter && substringAfterCharacter !== undefined){
                        // get specific command
                        const commandName = substringAfterCharacter.trim().split(' ')[0];
                        const getCommandInfo = buildCommands.filter(el => el.command === commandName );
                        // check command exist or not
                        if(getCommandInfo && getCommandInfo.length !== 0){
                            // check string contains required parameters or not
                            const isContainsRequiredParams = getCommandInfo[0].requiredParams.every(item => commandString.includes(item));
                            if(isContainsRequiredParams){
                                // check if command contains any at least one required parameter condition
                                if(getCommandInfo[0].atleastOneRequiredParams){
                                    const isContainsAtleaseOne = getCommandInfo[0].atleastOneRequiredParams.some(item => commandString.includes(item));
                                    if(!isContainsAtleaseOne){
                                        commandValidOutput.push(false);
                                    }
                                }
                                commandValidOutput.push(true);
                            } else {
                                commandValidOutput.push(false);
                            }
                        } else {
                            commandValidOutput.push(false);
                        }
                    } else {
                        commandValidOutput.push(false);
                    }
                }
            }
            // if all commands are valid then return true else return false
            if(commandValidOutput.includes(false)){
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };
}