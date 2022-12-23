import type { BotEvent } from "../discord.js"

const event: BotEvent = {
	name: "ready",
	once: true,
	execute: ({ user }) => {
		console.log(`${user?.tag} is ready!`)
	},
}

export default event
