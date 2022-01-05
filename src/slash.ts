import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { slashOutline } from './commands';

const endpoint = process.env.NODE_ENV === 'LOCAL'
    ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    : Routes.applicationCommands(process.env.CLIENT_ID);

async function registerSlashCommands() {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN); 
    try {
        console.log('refreshing slash commands');
        
        await rest.put(endpoint, { body: [slashOutline.data.toJSON()] });
        
        console.log('slash commands updated!');
    } catch (e) {
        console.log('could not refresh slash commands :(');
        console.error(e);
    }
}

export { registerSlashCommands }