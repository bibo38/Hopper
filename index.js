const http = require('http')
const url = require('url')
const yaml = require('js-yaml')

const server = http.createServer((req, res) => {
	let reqSplit = req.url.substr(1).split('/')
	let file = reqSplit.pop()
	let version = reqSplit.pop()
	let name = reqSplit.pop()
	let group = reqSplit.join('.')

	console.log(`${group}:${name}:${version}     ${file}`)
	res.end()
})
server.listen(8000)
