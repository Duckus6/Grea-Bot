const propTypes = require('prop-types')
const raids= require('../../data/tweetDeck.json')
const axios = require('axios')
require('dotenv').config()

const {TWIT_KEY, TWIT_SECRET, TWIT_BEARER} = process.env
const defaultHeaders = {
	Authorization: `Bearer ${TWIT_BEARER}`,
	"Content-type": "application/json",
}
const delStream = async () => {
	const {data:{data}} = await axios.get('https://api.twitter.com/2/tweets/search/stream/rules', {
		headers: defaultHeaders,
	}).catch(e => {console.log(e)})
	const ids = data.map(item => item.id)
	try {
		axios.post('https://api.twitter.com/2/tweets/search/stream/rules', {
			delete: {ids}
		}, {
			headers: defaultHeaders
		})
	} catch (e) {console.log(e)}

}
const addStream = async (msg, raid) => {
	const raidList = Object.keys(raids.HL)
	let raidValue = ""
	delStream()
	try {
		raidValue = raidList.find((key) => key.toLowerCase().includes(raid[0].toLowerCase()))
	} catch (e) {
		msg.reply((e instanceof TypeError)? "That is not in the raid list" : `Error occured ${e}`)
		return
	}
	const data = {
		add:[
			{value: raids.HL[raidValue], tag: raidValue}
		]
	}
	try{
		const resp = await axios.post('https://api.twitter.com/2/tweets/search/stream/rules', data, {
			headers: defaultHeaders			
		})
		console.log(resp)
	} catch(e) {console.log(e)}

}
const setStream = async (msg, raid) => {
	addStream(msg, raid)
	
}
///https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/quick-start

module.exports = {
	name: 'get',
	execute: setStream
}