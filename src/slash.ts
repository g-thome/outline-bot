import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { outline } from './commands';

async function registerCommandsForGuild(clientId: string, guildId: string) {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN); 
    try {
        console.log('refreshing slash commands');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId),
        {body: [outline.data.toJSON()]})
        console.log('slash commands updated!');
    } catch (e) {
        console.log('could not refresh slash commands :(');
        console.error(e);
    }
}

export { registerCommandsForGuild }