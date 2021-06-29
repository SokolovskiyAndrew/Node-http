const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const jsonData = fs.readFileSync('data.json');
    const userList = JSON.parse(jsonData);

    if(req.method === 'GET') {
        res.end(jsonData);
    }

    if(req.method === 'POST') {
        userList.push({
            id: 3,
            name: 'Luke',
            lastName: 'Worker'
        })
        fs.writeFile('data.json', JSON.stringify(userList, null, 1), (err) => {
            console.log(err)
        })

        res.end('new user was created');
    }

    if(req.method === 'PUT') {
        const userId = req.url.replace('/', '')
        const updatedUserList = userList.map((user) => {
            if(user.id === parseInt(userId, 10)) {
                return {
                    ...user,
                    lastName: 'Babel'
                }
            }

            return user
        })

        fs.writeFile('data.json', JSON.stringify(updatedUserList, null, 1), (err) => {
            console.log(err)
        })

        res.end(`User with id ${userId} last name was changed to Babel`)
    }

}).listen(3000)
