const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Get the bot token from environment variables
const TOKEN = process.env.DISCORD_TOKEN;  // Token will be set in Railway's Environment Variables
const PREMIUM_ROLE_ID = '1307052906540957788';  // Replace with your actual premium role ID

// Authorized user IDs (can use bot commands)
const CanUseBot = [
    '549104375927406614',  // MAJESTY
    '1287475111967981589', // Light
];

// Event handler for when the bot is ready
client.once('ready', () => {
  console.log('Bot is online!');
});

// Event handler for new messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;  // Ignore messages sent by bots

  // Function to check if the user is authorized to use certain commands
  function Allowed() {
    if (CanUseBot.includes(message.author.id)) {
      return true;
    } else {
      message.reply("You aren't authorized to use this command.");
      return false;
    }
  }

  // Command: !ping
  if (message.content === '!ping') {
    const sentMessage = await message.channel.send('Pong!');
    const botLatency = client.ws.ping;
    sentMessage.edit(`Pong! | Latency is ${botLatency}ms`);
  }

  // Command: !premium add <user_id>
  if (message.content.startsWith('!premium add')) {
    if (Allowed()) {
      const args = message.content.split(' ');

      // Ensure the user ID is provided
      if (args.length < 3) {
        return message.reply('Usage: !premium add <user_id>');
      }

      const userId = args[2];
      const user = await message.guild.members.fetch(userId).catch(() => message.reply('User not found.'));
      const role = message.guild.roles.cache.get(PREMIUM_ROLE_ID);

      if (!user) return message.reply('User not found.');
      if (!role) return message.reply('Role not found.');

      // Add the role to the user
      try {
        await user.roles.add(role);
        message.reply(`Successfully added the premium role to <@${userId}>.`);
      } catch (error) {
        message.reply('There was an error adding the role.');
        console.error(error);
      }
    }
  }

  // Command: !premium remove <user_id>
  if (message.content.startsWith('!premium remove')) {
    if (Allowed()) {
      const args = message.content.split(' ');

      // Ensure the user ID is provided
      if (args.length < 3) {
        return message.reply('Usage: !premium remove <user_id>');
      }

      const userId = args[2];
      const user = await message.guild.members.fetch(userId).catch(() => message.reply('User not found.'));
      const role = message.guild.roles.cache.get(PREMIUM_ROLE_ID);

      if (!user) return message.reply('User not found.');
      if (!role) return message.reply('Role not found.');

      // Remove the role from the user
      try {
        await user.roles.remove(role);
        message.reply(`Successfully removed the premium role from <@${userId}>.`);
      } catch (error) {
        message.reply('There was an error removing the role.');
        console.error(error);
      }
    }
  }
});

// Log the bot into Discord using the token
client.login(TOKEN);
