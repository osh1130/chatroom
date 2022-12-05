const express = require("express")
const expressWs = require("express-ws")
const router = express.Router()
expressWs(router)

// 声明一个数组，用来存放李四发出来的信息
let libaiArr = [];

// libai访问的地址
router.ws("/libai", ws=>{
  //ws.send("libai连接上了")
  ws.on('message', msg=>{
    // 接收李四传来的信息，存储后，再返回给李四
    libaiArr.push(msg);
    ws.send(msg);
})
})


// dufu访问的地址
router.ws("/dufu", ws=>{
  ws.send("dufu连接上了")
})

//dufu接受数据
router.ws('/dufu1', ws=>{
  let timer = null;
  // 监听到连接断开时，停止定时器，避免性能损耗
  ws.on('close', ()=>{
      if(timer){ clearInterval(timer) }
  })
  timer = setInterval(()=>{
    // 每一秒检查一次lisiArr
    if(libaiArr.length>0){
      let m = libaiArr[0];	// 获取第一项
      libaiArr.splice(0, 1);	// 删除第一项
      ws.send(m);		// send方法会阻断后续代码，因此必须写在最后
    }
  }, 1000)
})

module.exports = router;
