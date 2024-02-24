import { system } from "@minecraft/server";
import { ResponseTypes, playerManager } from "./PlayerManager";
export class CommandManager {
    constructor() {
        this.commands = [];
    }
    register(name, data) {
        this.commands.push({
            name,
            ...data,
            callback: data.callback,
            subcommands: []
        });
    }
    registerSubcommand(command, name, callback) {
        let commandIndex = this.commands.findIndex(_ => _.name == command);
        this.commands[commandIndex].subcommands.push({
            name,
            callback
        });
    }
    run(msg, prefix) {
        system.run(() => {
            if (!msg.message.startsWith(prefix))
                return;
            let name = msg.message.substring(prefix.length).split(' ')[0];
            let args = msg.message.substring(prefix.length).split(' ').slice(1);
            let command = this.commands.find(_ => _.name == name);
            if (!command)
                return playerManager.sendResponse(msg.sender, ResponseTypes.Error, "no command :(");
            let subcommand = command.subcommands.find(_ => _.name == args[0]);
            if (args.length >= 1 && subcommand) {
                subcommand.callback(msg, args.slice(1));
            }
            else {
                command.callback(msg, args);
            }
        });
    }
}
export const commandManager = new CommandManager();
