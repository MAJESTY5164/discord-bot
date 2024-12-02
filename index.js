const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch'); // Importing node-fetch for HTTP requests

const GitToken = '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'; // Hardcoded GitHub Token for testing
const OWNER = 'MAJESTY5164'; // GitHub username (owner)
const REPO = 'rounc-keysystem'; // Repository name
const FILE_PATH = 'id-hwid'; // Path to the file you want to modify
const COMMIT_MESSAGE = 'Updated HWID for existing ID'; // Commit message

// GitHub API URL for accessing the file
const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

async function updateFile(userID, hwid) {
  try {
    // Step 1: Fetch the current file content from GitHub
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${GitToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching file (${response.status}): ${response.statusText}`);
    }

    // Step 2: Get the current file data (including content and sha)
    const fileData = await response.json();
    const { sha, content } = fileData; // SHA is required for updating the file

    // Step 3: Decode the current file content from Base64
    const decodedContent = Buffer.from(content, 'base64').toString('utf-8');

    // Step 4: Update the HWID for the existing ID or append if not found
    const lines = decodedContent.split('\n');
    let idFound = false;

    const updatedLines = lines.map(line => {
      const [id, existingHwid] = line.trimStart().split(' | '); // Trim and split the line
      if (id === userID) {
        idFound = true;
        return `${id} | ${hwid}`; // Replace HWID for the matched ID
      }
      return line; // Keep other lines unchanged
    });

    if (!idFound) {
      // If the ID wasn't found, append it to the file
      updatedLines.push(`${userID} | ${hwid}`);
    }

    // Step 5: Encode the updated content to Base64
    const updatedContent = updatedLines.join('\n');
    const encodedContent = Buffer.from(updatedContent, 'utf-8').toString('base64');

    // Step 6: Create the payload to update the file
    const updatePayload = {
      message: COMMIT_MESSAGE,
      content: encodedContent, // New content (encoded in Base64)
      sha, // SHA of the existing file (to avoid conflicts)
    };

    // Step 7: Send the update request to GitHub
    const updateResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GitToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify(updatePayload),
    });

    if (!updateResponse.ok) {
      throw new Error(`Error updating file (${updateResponse.status}): ${updateResponse.statusText}`);
    }

    const updateResult = await updateResponse.json();
    console.log(
      idFound
        ? `HWID for ID ${userID} updated successfully.`
        : `ID ${userID} added successfully with new HWID.`
    );
  } catch (error) {
    console.error('Error:', error);
  }
}


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;
const PREMIUM_ROLE_ID = '1307052906540957788';
var StatusLevel = ["Member", "Mod", "Admin", "Owner", "Developer"]
var Auth = [
    '549104375927406614', 'Developer', // MAJESTY
    '1287475111967981589', 'Admin' // Light
]

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) {
      if (message.content === "Shutting Down :(") {
        process.exit();
      }else {
        return;  // Ignore messages sent by bots
      }
    }

    const member = message.guild.members.cache.get(message.author.id);

    function userstatus(check) {
      if (check === undefined) {
        check = message.author.id
      }
        if (!Auth.includes(check)) {
            perms = "Member"
        }else { // if (Auth.indexOf(message.author.id)) {
            perms = (Auth[Auth.indexOf(check) + 1])
        }
        return(perms)
    }

    function userlevel(check) {
      return(StatusLevel.indexOf(userstatus(check)))
    }

    if (message.content.startsWith('!auth')) {
      const args = message.content.split(' ');

      message.reply("you have " + userstatus(args[1]) + " (" + userlevel(args[1]) + ") " + " perms")
      }

    if (message.content === '!ping') {
      // Send a "Pong!" message first
      const sentMessage = await message.channel.send('Pong!');
    
        // Get the bot's latency and calculate the delay
        const botLatency = client.ws.ping;
    
        // Modify the "Pong!" message to include the bot's latency
        sentMessage.edit(`Pong! | Latency is ${botLatency}ms`);
  }

  if (message.content.startsWith('!premium add')) {
    if (userlevel() >= 2) {
    const args = message.content.split(' ');

    // Ensure the user ID is provided
    if (args.length < 3) {
      return message.reply('Usage: !premium add <user_id>');
    }

    const userId = args[2];
    const user = await message.guild.members.fetch(userId).catch(err => message.reply('User not found.'));
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
  }else {
    message.reply("you are not authorized to use this command.")
  }}

  // Command: !premium remove <user_id>
  if (message.content.startsWith('!premium remove')) {
    if (userlevel() >= 2) {
    const args = message.content.split(' ');

    // Ensure the user ID is provided
    if (args.length < 3) {
      return message.reply('Usage: !premium remove <user_id>');
    }

    const userId = args[2];
    const user = await message.guild.members.fetch(userId).catch(err => message.reply('User not found.'));
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
  }else {
    message.reply("you are not authorized to use this command.")
  }}

  // commadn: !kys
  if (message.content === '!kys') {
    if (userlevel() >= 4) {
      const emojiUrl = 'https://cdn.discordapp.com/emojis/618142863737487400.webp?size=96';
      const messageText = 'Shutting Down :(';
    
      message.reply({
        content: messageText, // The text accompanying the emoji
        files: [emojiUrl]     // Attach the emoji as an image
      })
    }else {
      message.reply("only MAJESTY can do this")
    }
  }

  // Command: !verify
  if (message.content.startsWith('!verify')) {
    const args = message.content.split(' ');
  
    if (member.roles.cache.some(role => role.id === PREMIUM_ROLE_ID) || userlevel() >= 1) {
      if (args.length < 2) {
        return message.reply('Usage: !verify <HWID> (use !Hwid to find your Roblox HWID)');
      }
  
      try {
        message.reply('Checking and updating authorization...');
        await updateFile(message.author.id, args[1]);
      } catch (error) {
        message.reply('An error has occurred.');
        console.error(error);
      }
    } else {
      message.reply('You don’t have premium access.');
    }
  }

  // Command !Hwid
if (message.content === '!Hwid') {
  message.reply('Run the following script to obtain your Roblox HWID, loadstring(game:HttpGet("https://github.com/MAJESTY5164/CeleryHub/blob/main/HWID%20Check.lua")')
}
  
});
// Log the bot into Discord using the token
client.login(TOKEN);
