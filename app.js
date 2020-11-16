// const express = require('express');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');


const app = express();

const usersRouter = require('./router/users');
const productRouter = require('./router/product');



let cont = {
    port: 8888,
    host: 'localhost'
};

// 配置静态web服务
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); // 读取和设置cookie的中间件


app.use('/users', usersRouter);
app.use('/product', productRouter);


// 自定义一个错误中间件
app.use(function(req, res, next) {
    // 中间件
    next(createError(404)); // 创建一个404错误
});

app.use(function(err, req, res, next) {
    // console.log(err.status);
    res.status(err.status || 500);
    res.location('/html/404.html');
});


app.listen(cont.port, cont.host, () => {
        console.log(`sever is running on http://${cont.host}:${cont.port}`);
    })
    /* 
    const express = require('express');
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const createError = require('http-errors');


    const app = express();
    const usersRouter = require('./router/users');
    // const productRouter = require('./router/product');


    let conf = {
        port: 8888,
        host: 'localhost'
    };

    // 配置静态web服务
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // post表单数据解析成json 

    app.use(cookieParser()); // 读取和设置cookie的中间件


    app.use('/users', usersRouter);
    // app.use('/product', productRouter);


    // 自定义一个错误中间件
    app.use(function(req, res, next) {
        // 中间件
        next(createError(404)); // 创建一个404错误
    });

    app.use(function(err, req, res, next) {
        // console.log(err.status);
        res.status(err.status || 500);
        res.location('/html/404.html');
    });

    app.listen(conf.port, conf.host, () => {
        console.log(`server is running on http://${conf.host}:${conf.port}`);
    })
     */