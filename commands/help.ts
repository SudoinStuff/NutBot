import * as Discord from "discord.js";
import * as descriptions from "../descriptions.json";
import { Command, GlobalData } from "../types";

const command: Command = {
	name: "help",
	execute: async (interaction: Discord.CommandInteraction, data: GlobalData) => {
		// const messages = ["Your nuts are your most valuable asset"];

		const mainMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Nutbot Help Menu 🥜")
			.setThumbnail("https://i.imgur.com/2Gpe6Fi.png")
			.addFields(
				{
					name: "Main Commands",
					value: "`/help commands`",
					inline: false
				},
				{ name: "Admin", value: "`/help admin`", inline: true },
				{ name: "Music", value: "`/help music`", inline: true }
			)
			.setFooter({
				text: "DM or ping Kaid#7340 if something is wrong"
			});

		const cmdMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("General Help")
			.addField(
				"Commands",
				[...data.commands.values()]
					.filter(cmd => (!cmd.type || cmd.type === "general") && !cmd.hidden)
					.map(cmd => `\`${cmd.name}\` — ${descriptions[cmd.name]}`)
					.sort()
					.join("\n")
			);

		const adminMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Admin/Moderation Help")
			.addField(
				"Commands",
				[...data.commands.values()]
					.filter(cmd => cmd.type === "admin")
					.map(cmd => `\`${cmd.name}\` — ${descriptions[cmd.name]}`)
					.sort()
					.join("\n")
			);

		const musicMenu = new Discord.MessageEmbed()
			.setColor(`#${data.config.color}`)
			.setTitle("Music Help 🎵")
			.setDescription("Play songs/videos from YouTube in a voice channel.")
			.addField(
				"Commands",
				[...data.commands.values()]
					.filter(cmd => cmd.type === "music")
					.map(cmd => `\`${cmd.name}\` — ${descriptions[cmd.name]}`)
					.sort()
					.join("\n")
			);

		let helpType = interaction.options.getString("category");
		let embed;

		switch (helpType) {
			case "commands":
				embed = cmdMenu;
				break;
			case "admin":
				embed = adminMenu;
				break;
			case "music":
				embed = musicMenu;
				break;
			default:
				embed = mainMenu;
				break;
		}
		await interaction.reply({
			embeds: [embed]
		});
	}
};

export default command;