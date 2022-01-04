import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { registerSlashCommands } from './slash';
import { outline } from './commands';

dotenv.config();

// intents number https://ziad87.net/intents/
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async c => {
	console.log('logged in as ', c.user.tag);
	await registerSlashCommands();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	try {
		await outline.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);