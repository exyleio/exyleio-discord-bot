import { SapphireClient } from "@sapphire/framework"
import dotenv from "dotenv"

dotenv.config()

const client = new SapphireClient({
	intents: ["GUILDS", "GUILD_MESSAGES"],
	presence: {
		activities: [
			{
				name: "Exyle.io",
				type: 0,
			},
		],
	},
})

client.login(process.env.DISCORD_BOT_TOKEN)
