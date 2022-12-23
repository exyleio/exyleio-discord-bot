declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string
			BOT_ID: string
		}
	}
}

export {}
