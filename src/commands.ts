import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { outline } from './outline';

const slashOutline = {
    data: new SlashCommandBuilder()
        .setName('outline')
        .setDescription('Creates an outlined page out of a link')
        .addStringOption(option => 
            option.setName('link')
                .setDescription('the link to get outlined')
                .setRequired(true)),
    async execute(i: CommandInteraction) {
        const link = i.options.getString('link').trim();
        const url = await outline(link);
        await i.deferReply();

        if (!url) {
            return await i.editReply('could not generate outline link');
        }

        await i.editReply(url);
    }
}

export { slashOutline }