const express = require("express")
const expressWs = require("express-ws")
const router = express.Router()
expressWs(router)

// 李四访问的地址
router.ws("/lisi", ws=>{
  ws.send("李四连接上了")
})

// 王五访问的地址
router.ws("/wangwu", ws=>{
  ws.send("王五连接上了")
})

module.exports = router;
