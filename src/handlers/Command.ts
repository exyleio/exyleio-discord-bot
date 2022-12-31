import { REST } from "@discordjs/rest"
import { Client, Routes, SlashCommandBuilder } from "discord.js"
import { readdirSync } from "fs"
import { join } from "path"

import type { SlashCommand } from "../discord.js"

module.exports = (client: Client) => {
	const slashCommands: SlashCommandBuilder[] = []
	const slashCommandsDir = join(__dirname, "../slashCommands")
	readdirSync(slashCommandsDir).forEach((file) => {
		if (!file.endsWith(".js")) return
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const command: SlashCommand = require(`${slashCommandsDir}/${file}`).default
		slashCommands.push(command.command)
		client.slashCommands.set(command.command.name, command)
	})

	// const commands: Command[] = []
	// let commandsDir = join(__dirname, "../commands")
	// readdirSync(commandsDir).forEach((file) => {
	// 	if (!file.endsWith(".js")) return
	// 	let command: Command = require(`${commandsDir}/${file}`).default
	// 	commands.push(command)
	// 	client.commands.set(command.name, command)
	// })

	const rest = new REST({ version: "10" }).setToken(
		process.env.DISCORD_BOT_TOKEN
	)

	rest
		.put(Routes.applicationCommands(process.env.DISCORD_BOT_ID), {
			body: slashCommands.map((command) => command.toJSON()),
		})
		.then((data: any) => {
			console.log(`Loaded ${data.length} slash command(s)`)
		})
		.catch((e) => {
			console.log(e)
		})
}
