const devMode = process.env.NODE_ENV === 'dev';
if (devMode) require('dotenv').load();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('./public'));
app.use('/dist', express.static('./dist'));
app.use('/', routes);

if (devMode) {
  require('dotenv').load();
  const webpack = require('webpack');
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(devMiddleware);
  app.use(require('webpack-hot-middleware')(compiler));
  app.get('*', (req, res) => {
    res.write(devMiddleware.fileSystem.readFileSync(path.resolve('dist/index.html')));
    res.end();
  });
} else {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
  });
}

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log('UP AND RUNNING@', process.env.PORT); // eslint-disable-line no-console
});
