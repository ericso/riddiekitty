# riddiekitty

A Slackbot for riddles


** Note for deploy on Heroku:

You have to install the following buildpack after the heroku/nodejs buildpack:

https://buildpack-registry.s3.amazonaws.com/buildpacks/zidizei/typescript.tgz

Go to the Settings tab at dashboard.heroku.com and add the buildpack.

You also have to set the following Config Vars:

* NPM_CONFIG_PRODUCTION: false
* YARN_PRODUCTION: false
