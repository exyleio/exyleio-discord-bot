declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_BOT_TOKEN: string
			DISCORD_BOT_ID: string
		}
	}
}

export {}
