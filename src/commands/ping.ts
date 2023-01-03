import { isMessageInstance } from "@sapphire/discord.js-utilities"
import { ChatInputCommand, Command } from "@sapphire/framework"

export class PingCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, { ...options })
	}

	public override registerApplicationCommands(
		registry: ChatInputCommand.Registry
	) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName("ping")
				.setDescription(
					"Measures communication delay (latency) in 1/1000 of a second, also known as millisecond (ms)."
				)
		)
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		const msg = await interaction.reply({
			content: `ping!`,
			ephemeral: true,
			fetchReply: true,
		})

		if (isMessageInstance(msg)) {
			const diff = msg.createdTimestamp - interaction.createdTimestamp
			const ping = Math.round(this.container.client.ws.ping)

			return interaction.editReply(
				`pong! 🏓
round trip: ${diff}ms
bot: ${ping}ms`
			)
		}

		return interaction.editReply("Failed to retrieve ping :(")
	}
}
