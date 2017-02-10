module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "carcarecapp",
      script    : "./server/index.js",
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      key  : "./ssh/id_rsa",
      user : "carcareapp",
      host : "138.197.108.171",
      ref  : "origin/master",
      repo : "https://github.com/noahjohn9259/carcareapp.git",
      path : "/home/carcareapp",
      "post-deploy" : "nvm install && npm install && /home/carcareapp/.nvm/versions/node/v6.9.4/bin/pm2 startOrRestart ~/source/ecosystem.config.js --env production"
    }
  }
}
