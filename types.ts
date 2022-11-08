import { Player } from "discord-player";
import { CommandInteraction } from "discord.js";

export interface ConfigData {
  clientID: string;
  nutGuild: string;
  color: string;
  botAdmins: string[];
  oldColor: string;
  commandsPerPage: number;
  testGuild: string;
}

export interface GlobalData {
  config: ConfigData;
  musicPlayer: Player;
  cooldowns: {
    nut: Set<string>;
  };
	commands: Map<string, Command>;
	dev: boolean;
}

export interface Command {
	name: string;
	type?: "admin" | "music" | "general";
	botAdmin?: boolean;
	hidden?: boolean;
	execute: (inter: CommandInteraction, data: GlobalData) => any;
}
