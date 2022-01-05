import { Client, Intents } from 'discord.js';
import { registerSlashCommands } from './slash';
import { slashOutline } from './commands';
import { getLinkFromString } from './getLinkFromString';
import { outline } from './outline';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async c => {
	console.log('logged in as ', c.user.tag);
	await registerSlashCommands();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	try {
		await slashOutline.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async m => {
	const mentionsBot = m.mentions.has(client.user.id);
	const isReply = m.type === 'REPLY';

	if (!isReply) {
		return;
	}
	
	const targetMessage = await m.channel.messages.fetch(m.reference.messageId);
	const targetMessageLink = getLinkFromString(targetMessage.content);
	if (!(isReply && mentionsBot && targetMessageLink)) {
		return;
	}

	const link = await outline(targetMessageLink);
		
	link && await m.reply(link);
})

client.login(process.env.TOKEN);