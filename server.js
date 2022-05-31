const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const faker = require('faker');
const router = new Router();
const app = new Koa();
const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(
  koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
  })
);

router.get('/messages/unread', async (ctx) => {
  function createMessage() {
    return {
      id: faker.datatype.uuid(),
      from: faker.internet.email('name', 'surname', 'test.com'),
      subject: faker.lorem.words(3),
      body: faker.lorem.words(10),
      received: Date.now(),
    };
  }

  const quantity = Math.floor(Math.random() * 3);
  const messages = Array.from({ length: quantity }, createMessage);

  ctx.response.body = JSON.stringify({
    status: 'ok',
    timestamp: Date.now(),
    messages: messages,
  });
});

app.use(router.routes()).use(router.allowedMethods());

server.listen(port, () => console.log('Server started'));
