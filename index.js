const http = require('http')
const url = require('url')
const yaml = require('js-yaml')
const fs = require('fs')
const Artifact = require('./artifact.js')

const cfg = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'))
console.log(cfg)

const server = http.createServer((req, res) => {
	res.setHeader('Server', cfg.server.name)
	
	let routingPathPossibilities =
		Object.keys(cfg.routing)
		.filter(path => req.url.startsWith(path))
	if(!routingPathPossibilities.length)
	{
		res.writeHead(404)
		fs.createReadStream(cfg.server.error_page).pipe(res)
		return
	}
	let routingPath = routingPathPossibilities
		.reduce((prev, cur) => prev.length > cur.length ? pref : cur)
	
	let reqSplit = req.url.substr(routingPath.length).replace(/^\//, '').split('/')
	let file = reqSplit.pop()
	let version = reqSplit.pop()
	let name = reqSplit.pop()
	let group = reqSplit.join('.')
	let artifact = new Artifact(group, name, version)

	console.log(`${artifact.mavenName}     ${file} via ${routingPath}`)

	res.end()
})
server.listen(8000)
