const fs = require('fs')
const discord = require('discord.js')
const twitter = require('twitter')

const {spamChannel, prefix} = require('../config.json')

require('dotenv').config()

const client = new discord.Client()
client.commands = new discord.Collection()
const {TOKEN} = process.env


const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'))
commandFiles.forEach((file) => {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
})


client.once('ready', () => {
    console.log('Ready!')
})

const messageCheck = (msg) => {
	console.log(msg.content[0], prefix)
	return (msg.content[0] === prefix && !msg.author.bot && msg.channel.contains(spamChannel))
}

client.on('message', (msg) => {
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/)
	const command = args.shift().toLowerCase()
	if (!(client.commands.has(command) || messageCheck(msg))) return
	try {
		console.log(client.commands)
		console.log(client.commands.get(command))
		client.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
})

client.login(TOKEN)

//https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only
//https://www.npmjs.com/package/twitter
//https://discord.js.org/#/docs/main/master/general/welcome
//step 5
///https://discordjs.guide/command-handling/#dynamically-reading-command-files