const express = require('express')
const history = require('connect-history-api-fallback');

const app = express()

// 在静态资源生效前使用解决404的中间件
app.use(history())
// 让服务器读取我们存放在static的index.html
app.use(express.static(__dirname + '/static'))

app.get('/person', (request, response) => {
    response.send(
        {name: 'tom', age: 18}
    )
})

app.listen(5005, (err) => {
    if(!err) console.log('服务器启动成功！');
})