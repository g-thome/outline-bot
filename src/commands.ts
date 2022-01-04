import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { get } from './request';

const outline = {
    data: new SlashCommandBuilder()
        .setName('outline')
        .setDescription('Creates an outlined page out of a link')
        .addStringOption(option => 
            option.setName('link')
                .setDescription('the link to get outlined')
                .setRequired(true)),
    async execute(i: CommandInteraction) {
        try {
            await i.deferReply();
            const shortCode = await get(i.options.getString('link').trim());
            await i.editReply('https://outline.com/' + shortCode);
        } catch (_) {
            await i.reply('could not generate outline link');
        }
    }
}

export { outline }