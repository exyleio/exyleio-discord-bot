import type { Command, SlashCommand } from "./discord.js"

import { Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import dotenv from "dotenv"
import { readdirSync } from "fs"
import { join } from "path"

// load .env
dotenv.config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.User,
		Partials.GuildMember,
		Partials.Reaction,
	],
	presence: {
		activities: [
			{
				name: "Exyle.io",
				type: 0,
			},
		],
	},
})

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach((handler) => {
	require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.DISCORD_BOT_TOKEN).catch((err) => {
	console.error("[CRASH]" + err)
	return process.exit()
})
