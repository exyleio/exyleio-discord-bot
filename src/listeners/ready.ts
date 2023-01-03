import { Events, Listener } from "@sapphire/framework"
import type { Client } from "discord.js"

export class ReadyListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			once: true,
			event: Events.ClientReady,
		})
	}

	public async run(client: Client) {
		await this.deleteUnusedCommands()

		this.container.logger.info(`${client?.user?.tag} is ready!`)
	}

	/**
	 * Automatically remove unused slash commands
	 *
	 * https://github.com/sapphiredev/framework/pull/579
	 */
	private async deleteUnusedCommands() {
		const commands = await this.container.client.application?.commands.fetch()

		if (!commands) return

		this.container.logger.debug(
			`Fetched all Application Commands for the currently logged in client`
		)

		const store = this.container.stores.get("commands")

		if (!store) return

		const commandsToDelete = commands.filter(
			(command) => !store.has(command.name)
		)

		for (const command of commandsToDelete.values()) {
			this.container.logger.debug(
				`Deleting application command ${command.name} (${command.id})`
			)
			await this.container.client.application?.commands.delete(command)
		}
	}
}
