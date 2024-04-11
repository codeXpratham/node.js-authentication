
// // const http = require('http');
// import http from 'http'
// import fs from 'fs'

// // import * as gfs from './gf.js'
// import acchi , {tempGF1, tempGF2, bsdiwali,lovePercentage} from './gf.js'

// const home = fs.readFileSync("./index.html" )

// // console.log(home);


// console.log(lovePercentage());  

// const server = http.createServer((req, res) => {
//     console.log('servered');
    

//     if(req.url === '/about'){
//         res.end(`<h1>Love is ${lovePercentage()}</h1>`);
//     }
//     else if(req.url === '/'){
//         // fs.readFile("./index.html",(err, home)=> {
//         //     res.end(home);
//         // });
//         res.end(home);
//     }
//     else if(req.url === '/contact'){
//         res.end("<h1>Contact Page</h1>");
//     }
//     else if(req.url === '/jaat'){
//         res.end("<h1>Jaat Page</h1>");
//     }
//     else {
//         res.end("<h1>Page not found</h1>");
//     }
// });

// server.listen(5000, () => {
//     console.log('listening on port');
// } );