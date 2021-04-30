const propTypes = require('prop-types')
const raids = require('../../data/tweetDeck.json')
const axios = require('axios')
require('dotenv').config()

const {TWIT_KEY, TWIT_SECRET, TWIT_BEARER} = process.env
const getTweet = (msg, raid) => {
	const raidNames = Object.keys(raids)
	try{
		const raidValue = raidList.find(([key,val]) => key.toLowerCase().includes(raid))
	} catch (e) {
		msg.reply((e instanceof TypeError)? "That is not in the raid list" : `Error occured ${e}`)
		return
	}
	axios.post('https://api.twitter.com/2/tweets/search/stream/rules', {
		headers: {
			Authorization: `Bearer ${TWIT_BEARER}`,
			"Content-type": "application/json",
		},
		data: {
			add:[
				{value: raidValue[1], tag: raidValue[0]}
			]
		}
	})
	
}
///https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/quick-start