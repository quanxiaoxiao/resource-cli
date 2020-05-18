const http = require('http');
const router = require('@quanxiaoxiao/router');
const www = require('@quanxiaoxiao/www');
const conditional = require('koa-conditional-get');
const compress = require('koa-compress');
const Koa = require('koa');
const etag = require('koa-etag');
const config = require('./config');
const apis = require('./apis');

const app = new Koa();

app.use(compress());
app.use(conditional());
app.use(etag());

app.use(router({
  ...apis,
  ...www(
    Object
      .entries(config.dist.projects)
      .reduce((acc, [projectName, value]) => ({
        ...acc,
        [projectName]: {
          key: value.key,
          pages: {
            ...value.pathList.reduce((pathes, pathname) => ({
              ...pathes,
              [pathname]: () => 'index.html',
            }), {
              [value.staticPath]: (matchs) => decodeURIComponent(matchs[1]),
            }),
          },
        },
      }), {}),
    config.dist.dbPathName,
    config.dist.staticPath,
  ),
}));

const server = http.createServer(app.callback());

server.listen(config.serverPort, () => {
  console.log(`server listen at port ${config.serverPort}`);
});
