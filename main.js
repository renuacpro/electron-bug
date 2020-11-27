const http = require("http")

function makeRequest() {
	return new Promise((resolve, reject) => {
		const fail = (req, res, e) => {
			if (res) {
				res.destroy()
			}
			req.abort()
			reject(e)
		}

		console.log("request")
		const url = "http://localhost:3000"
		const headers = {
			userIds: "MN8_7VH----0",
			v: "64",
			cv: "3.78.0",
		}
		const req = http.request(url, {
				method: "GET",
				headers,
				// this defines the timeout for the connection attempt, not for waiting for the servers response after a connection was made
				timeout: 20000
			}
		).on('response', res => {
			if (res.statusCode !== 200) {
				fail(req, res, null)
				return
			}
			res.setEncoding('utf8')

			let resData = ''
			res.on('data', chunk => {
				resData += chunk
			}).on('end', () => {
				try {
					resolve(resData)
				} catch (e) {
					fail(req, res, e)
				}
			})
			   .on('error', e => fail(req, res, e))
		}).on('error', e => fail(req, null, e)).end()
	})
}

;(async () => {
	let n = 0
	while (true) {
		console.log(`starting ${n}`)
		const start = Date.now()
		// Uncomment this line to unstuck requests
		// setImmediate(() => console.log("Uncomment me to make requests go fast!!"))
		await makeRequest("MN7iIkM----0")
		console.log(`finished ${n} in ${Date.now() - start}`)
		n++
		await delay(4000)
	}
})()

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}