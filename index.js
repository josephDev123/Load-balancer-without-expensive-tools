import express from 'express';
import * as dotenv from 'dotenv'

dotenv.config();
const PORT1 = process.env.PORT1;
const PORT2 = process.env.PORT2;
const PORT3 = process.env.PORT3;

const app = express();
const app2 = express();
const app3 = express();

app.get('/', (req, res)=>{
    console.log('hello world 1')
    res.end()
});
app2.get('/', (req, res)=>{
    console.log('hello world 2')
    res.end()
})
app3.get('/', (req, res)=>{
    console.log('hello world 3')
    res.end()
})


app.listen( PORT1, console.log(`server 1 listening on ${PORT1}`))
app2.listen( PORT2, console.log(`server 2 listening on ${PORT2}`))
app3.listen( PORT3, console.log(`server 3 listening on ${PORT3}`))