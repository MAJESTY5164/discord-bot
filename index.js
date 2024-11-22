const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;  // Bot Token from Environment Variable

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;  // Ignore bot messages

  // Simple command to reply "Pong!" on !ping
  if (message.content === '!ping') {
    const botLatency = client.ws.ping;
    message.reply(`Pong! | Latency is ${botLatency}ms`);
  }

  // Premium add/remove role functionality
  const PREMIUM_ROLE_ID = '549104375927406614';  // Replace with the role ID you want to manage
  const ADMIN_USER_ID = 'YOUR_ADMIN_USER_ID'; // Replace with the admin ID

  if (message.content.startsWith('!premium add')) {
    if (message.author.id !== ADMIN_USER_ID) {
      return message.reply("You don't have permission to use this command.");
    }

    const args = message.content.split(' ');
    if (args.length < 3) {
      return message.reply('Usage: !premium add <user_id>');
    }

    const userId = args[2];
    const user = await message.guild.members.fetch(userId).catch(() => message.reply('User not found.'));
    const role = message.guild.roles.cache.get(PREMIUM_ROLE_ID);

    if (!user || !role) {
      return message.reply('User or role not found.');
    }

    try {
      await user.roles.add(role);
      message.reply(`Successfully added the premium role to <@${userId}>.`);
    } catch (error) {
      message.reply('There was an error adding the role.');
      console.error(error);
    }
  }

  if (message.content.startsWith('!premium remove')) {
    if (message.author.id !== ADMIN_USER_ID) {
      return message.reply("You don't have permission to use this command.");
    }

    const args = message.content.split(' ');
    if (args.length < 3) {
      return message.reply('Usage: !premium remove <user_id>');
    }

    const userId = args[2];
    const user = await message.guild.members.fetch(userId).catch(() => message.reply('User not found.'));
    const role = message.guild.roles.cache.get(PREMIUM_ROLE_ID);

    if (!user || !role) {
      return message.reply('User or role not found.');
    }

    try {
      await user.roles.remove(role);
      message.reply(`Successfully removed the premium role from <@${userId}>.`);
    } catch (error) {
      message.reply('There was an error removing the role.');
      console.error(error);
    }
  }
});

client.login(TOKEN);
