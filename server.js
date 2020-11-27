const url = require('url')
const http = require('http')

const app = http.createServer((request, response) => {
	response.writeHead(200)
	response.write("Request OK")
	response.end()
})

app.listen(3000)
console.log("Listening on port 3000")