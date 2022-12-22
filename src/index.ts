import { Client, Events, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"

// load .env
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, ({ user }) => {
	console.log(`"${user.tag}" is ready!`)
})

client.login(process.env.TOKEN)
