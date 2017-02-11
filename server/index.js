import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config.dev';

import services from './routes/services';

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use('/api/services', services);

const compiler = webpack(webpackConfig);

// app.use(historyApiFallback());
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(4000, () => console.log('Running on localhost: 4000'));
