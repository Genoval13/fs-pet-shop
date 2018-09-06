const fs = require('fs');
const http = require('http');

//GET POST DELETE UPDATE
//CRUD ----> POST GET UPDATE DELETE

//Create a server?
const server = http.createServer((request, response) => {
    // if command is GET and the file path is ok, read me the file
      fs.readFile('pets.json', 'utf8', (err, data) => {
          const dataArr = JSON.parse(data);
        
        //GET method
        if (request.method === 'GET') {
          if (request.url === '/pets'){
            response.end(data)
          } else if (request.url.split('/')[1] === 'pets' &&request.url.split('/')[2] ) {
            response.end(JSON.stringify(JSON.parse(data)[request.url.split('/')[2]]))
          }

        }   else if (request.method === 'POST' && request.url === '/pets') {
            let body = '';
            request.on('data', function (chunk) {
            body += chunk;
            });
            request.on('end', function () {
                const parsedBody = JSON.parse(body);
                const newPet = {"age":parseInt(parsedBody.age),"kind":parsedBody.kind,"name":parsedBody.name}
                dataArr.push(newPet);
                console.log(dataArr);
                write(dataArr);
            });
            response.end('This is a POST request!');
            
        }   else if (request.method === 'PUT' && request.url.split('/')[2]) {
            let body = '';
            request.on('data', function (chunk) {
            body += chunk;
            });
            request.on('end', function () {
                const parsedBody = JSON.parse(body);
                const newPet = {"age":parseInt(parsedBody.age),"kind":parsedBody.kind,"name":parsedBody.name}
                dataArr.splice(request.url.split('/')[2], 1, newPet);
                console.log(dataArr);
                write(dataArr);
            });
            response.end('This is an PUT request!');

        }   else if (request.method === 'DELETE' && request.url.split('/')[2]) {
            dataArr.splice(request.url.split('/')[2], 1);
            write(dataArr);
            response.end('This a DELETE request!');
        }
        response.end('You screwed up again!');
    })
})

server.listen(8000, () => {
    console.log('hey, server is on!!!')
})


function write (Arr) {
    fs.writeFile('pets.json', JSON.stringify(Arr), (err) => {
        if (err) throw err;
    })
};





module.exports = server;