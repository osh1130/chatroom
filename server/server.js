const express = require("express")
const expressWs = require("express-ws")
const app = express();
const port = 3030;
const websocket = require('./websocket')
expressWs(app)

// 中间件
app.use('/libai', express.static('public/libai.html'))
app.use('/dufu', express.static('public/dufu.html'))
app.use('/master', express.static('public/master.html'))
app.use('/visitor', express.static('public/visitor.html'))
app.use(express.static('public'))	// 主动访问public下的文件
app.use('/ws', websocket)		// 访问/ws路径时，调用websocket
app.get("/*", (req,res)=>{})
app.listen(port, ()=>{
  console.log(`Server is running at http://localhost:${port}`)
})
