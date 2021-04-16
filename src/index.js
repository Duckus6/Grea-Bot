const discord = require('discord.js')
const twitter = require('twitter')
require('dotenv').config()

const client = new discord.Client()
const {TOKEN} = process.env
let spamChannel = ''
let prefix = '~'

const messageCheck = (msg) => {
	return (msg.content[0] === prefix || !messageCheck.author.bot)
}
const setSpamChannel = (channel) => {
	if (channel.type === 'text') {
		spamChannel = channel
		return true
	}
	return false
}
//
client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', (msg) => {
    if (msg.content === 'ping' && messageCheck(msg)) msg.channel.send('pong')
})

client.login(TOKEN)

const getTweet = () => {
    const url = "https://api.twitter.com/2/tweets/search/recent"
    fetch()
}
//https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only
//https://www.npmjs.com/package/twitter
//https://discord.js.org/#/docs/main/master/general/welcome
//step 5
///https://discordjs.guide/command-handling/#dynamically-reading-command-files