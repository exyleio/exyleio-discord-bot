import type {
	AutocompleteInteraction,
	Collection,
	CommandInteraction,
	Message,
	PermissionResolvable,
	SlashCommandBuilder,
} from "discord.js"

declare module "discord.js" {
	export interface Client {
		slashCommands: Collection<string, SlashCommand>
		commands: Collection<string, Command>
		cooldowns: Collection<string, number>
	}
}

export interface SlashCommand {
	command: SlashCommandBuilder | any
	execute: (interaction: CommandInteraction) => void
	autocomplete?: (interaction: AutocompleteInteraction) => void
	cooldown?: number // in seconds
}

export interface Command {
	name: string
	execute: (message: Message, args: Array<string>) => void
	permissions: Array<PermissionResolvable>
	aliases: Array<string>
	cooldown?: number
}

interface GuildOptions {
	prefix: string
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
	name: string
	once?: boolean | false
	execute: (...args: any) => void
}
