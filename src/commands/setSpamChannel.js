const propTypes = require('prop-types')
const fs = require('fs')

const setSpamChannel = (msg, channel) => {
	if (msg.channel.type === 'text') {
		const spamChannel = channel
		const config = JSON.parse(fs.readFileSync('./config.json'))
		config.spamChannel = spamChannel
		fs.writeFileSync('./config.json', JSON.stringify(config))
		console.log(config)
		msg.reply(`Changed channel to ${spamChannel}`)
		return true
	}
	return false
}
setSpamChannel.propTypes = {
	channel: propTypes.object.isRequired 
}
module.exports = {
	name: 'setspamchannel',
	execute: setSpamChannel
}