import { SlashCommandBuilder } from "discord.js"

import type { SlashCommand } from "../discord.js"

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("ping")
		.setDescription(
			"Measures communication delay (latency) in 1/1000 of a second, also known as millisecond (ms)."
		),
	execute: async (interaction) => {
		await interaction.reply("Pong!")
		await interaction.editReply(`Pong!
Bot latency: ${Math.round(interaction.client.ws.ping)}ms`)
	},
	cooldown: 2,
}

export default command
