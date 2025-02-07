// Import the Discord.js selfbot library
const { Client, ActivityType, Interaction } = require('discord.js-selfbot-v13');

    const fs = require('fs').promises;

    blpeople = []
    vips = []
    viproles = []
    blroles = []
    devs = []
    limit = "Normal"
    pfx = "sb!"

ownerID = '549104375927406614'

devs.push(ownerID)

// Create a new client instance
const client = new Client();


// Event: Runs when the bot logs in
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    client.user.setPresence({
        activities: [{ name: "Bot Online [Prefix: " + pfx + "]", type: "WATCHING" }],
        status: "dnd" // Other options: "idle", "dnd", "invisible"
    });

    try {
        const user = await client.users.fetch('549104375927406614'); // Fetch the user by ID
        await user.send('Bot Online prefix is ' + pfx); // Send the message to the user
    } catch (error) {
        console.error('Error sending DM:', error);
    }
});

atschool = false

// Event: Respond to messages
client.on('messageCreate', async (message) => {

    if (message.mentions.users.has('549104375927406614')) {
    if (atschool === true) {
        if (message.author.id !== '1337436221919461407') {
        message.reply('Hello! MAJESTY is currently at school any responses my be delayed.')
        }
    }
    }
    if (message.author.bot) return;
    
    if (message.guild) {
        if (blroles.some(role => message.guild.members.cache.get(message.author.id).roles.cache.map(role => role.id).includes(role))) {
            return
        }
    }
    if (blpeople.includes(message.author.id)) return

    if (message.guild) {
        if (viproles.some(role => message.guild.members.cache.get(message.author.id).roles.cache.map(role => role.id).includes(role))) {
            vip = true
        }else {
            vip = vips.includes(message.author.id)
        }
    }else {
        vip = vips.includes(message.author.id)
    }

    if (limit === "Dev") {
        if (devs.includes(message.author.id)) {
            
        }else {
            return
        }
    }else if (limit === "Open") {
        vip = true
    }else if (limit === "Limted") {
        if (vip === true) {

        }else {
            return
        }
    }

    SMPLtxt = "n/a"

    if (message.content.startsWith(pfx + 'storage')) {
        if (devs.includes(message.author.id)) {
        async function simpl(a, v) {
        if (a.length === 1) {
            x = `['` + a[0] + `']`
        }else if (a.length === 0) {
            x = '[]'
        }else {
        x = `['` + a[0] + `',`

        for (let i = 1; i < a.length; i++) {
          if (i === a.length - 1) {
            x = x + `'` + a[i] + `']`
          }else {
            x = x + `'` + a[i] + `',`
        }}}
        if (SMPLtxt === "n/a") {
            SMPLtxt = v + ' = ' + x
        }else {
        SMPLtxt = SMPLtxt + '\n' + v + ' = ' + x
        }
        return x
    }
        await simpl(blpeople, "blpeople")
        await simpl(vips, "vips")
        await simpl(viproles, "viproles")
        await simpl(blroles, "blroles")
        await simpl(devs, "devs")
        message.reply('```' + SMPLtxt + '```')
    }}

    if (message.content.startsWith(pfx + 'role')) {
        const args = message.content.split(" ");
        if (args.length === 4) {
            if (args[1] === "+") {
                if (args[2] === "vip") {
                    if (viproles.includes(args[3])) {
                        message.reply(args[3] + " is already a vip role.");
                    }else {
                    viproles.push(args[3])
                    console.log(viproles)
                    message.reply(args[3] + " is now a vip role.");
                    }
                }else if (args[2] === "blacklist") {
                    if (blroles.includes(args[3])) {
                        message.reply(args[3] + " is already a blacklisted role.");
                    }else {
                    blroles.push(args[3])
                    message.reply(args[3] + " is now a blacklisted role.");
                    }
                }else { // not blacklist or vip
                    message.reply("options are blacklist or vip")
                }
            }else if (args[1] === "-") {
                if (args[2] === "vip") {
                    if (viproles.includes(args[3])) {
                        message.reply(args[3] + " is nolonger a vip role.");
                        viproles.splice(viproles.indexOf(args[3]), 1)
                    }else {
                    message.reply(args[3] + " isn't a vip role.");
                    }
                }else if (args[2] === "blacklist") {
                    if (blroles.includes(args[3])) {
                        message.reply(args[3] + " is nolonger a blacklisted role.");
                        blroles.splice(blroles.indexOf(args[3]), 1)
                    }else {
                    message.reply(args[3] + " isn't a blacklisted role.");
                    }
                }else { // not blacklist or vip
                    message.reply("options are blacklist or vip")
                }
            }else { // not + or -
                message.reply("didnt specify + or -")
            }
        }else { // args !== 4
            message.reply('more than 3 arguments were given')
        }
    }

    if (message.content.startsWith(pfx + 'limit')) {
        if (devs.includes(message.author.id)) {
        const args = message.content.split(" ");
        if (args.length === 2) {
            opt = args[1]
            if (opt === "Normal") {
                message.reply('Anyone can use commands');
                limit = "Normal"
            }else if (opt === "Open") {
                message.reply('Vip commands are available to everyone');
                limit - "Open"
            }else if (opt === "Limited") {
                message.reply('Only Vips & Devs can use commands');
                limit = "Limited"
            }else if (opt === "Dev") {
                message.reply('Only Devs can use commands');
                limit = "Dev"
            }else {
                message.reply('Invalid Arguments [Normal, Open, Limited, & Dev]');
            }
        }else
        message.reply('Invalid Arguments [Normal, Open, Limited, & Dev]');
    }else {
        message.reply('You dont have permission to use this command')
     }
}

    if (message.content === pfx + 'ping') {
        message.reply('Pong!');
    }

    if (message.content.startsWith(pfx + 'pfp')) {
        if (vip) {
        const args = message.content.split(" ");
        console.log(message.mentions.users)
        if (message.mentions.users.size === 1) {
            console.log('Mention given');
            console.log(message.mentions.users.first().id)
            id = message.mentions.users.first().id
        }else if (args.length === 2) {
            console.log(args[1])
            id = args[1]
        }else {
            console.log('invalid args')
            message.reply('invalid arguments')
            return
        }
        try {
            const user = await client.users.fetch(id);
            const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

            await message.reply(`Here is their profile picture: ${avatarUrl}`);
        } catch (error) {
            console.error("Error fetching user:", error);
            await message.reply("Could not fetch the user's profile picture.");
        }
    }else {
        message.reply('You dont have permission to use this command')
    }
}

    //if (message.author.id !== '549104375927406614') return;

    if (message.content.startsWith(pfx + 'pfx')) {
        if (devs.includes(message.author.id)) {
        const args = message.content.split(" ");
        if (args.length === 2) {
        pfx = args[1]
        message.reply('New prefix assigned [' + pfx + "]")
        client.user.setPresence({
            activities: [{ name: "Bot Online [Prefix: " + pfx + "]", type: "WATCHING" }],
            status: "dnd" // Other options: "idle", "dnd", "invisible"
        });
    }else {
        message.reply('invalid arguments')
    }
    }else {
        message.reply('You dont have permission to use this command')
    }
    } 
    
    if (message.content === pfx + 'School') {
        if (devs.includes(message.author.id)) {
    if (atschool === true) {
        message.reply('Afk School responses are now disabled');
        atschool = false
    }else {
        message.reply('Afk School responses are now enabled');
        atschool = true
    }
    }else {
        message.reply('You dont have permission to use this command')
    }
    }
    // Example command: !ping
    if (message.content === pfx + 'shutdown') {
        if (message.author.id === ownerID) {
        client.user.setPresence({
            activities: [{ name: "Bot Offline", type: "WATCHING" }],
            status: "dnd" // Other options: "idle", "dnd", "invisible"
        });
        message.reply({
            content: 'Shutting Down',
            files: ['https://cdn.discordapp.com/emojis/806719693913980948.webp?size=96'] // Replace with your image URL
        });
        setTimeout(function() {
            process.exit()
        }, 10000); // Wait for 2000 milliseconds (2 seconds)
    }else {
        message.reply('You dont have permission to use this command')
    }
}
});

// Log in to your account
client.login(process.env.DISCORD_TOKEN); // Replace with your account token
