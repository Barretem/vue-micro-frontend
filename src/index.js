import './assets/system'
// import '../libs/es6-promise.auto.min'
import * as singleSpa from 'single-spa';
import { registerApp } from './register'

async function bootstrap() {
  let projectConfig = await SystemJS.import('/project.config.js')
  projectConfig.projects.forEach(element => {
    registerApp({
      name: element.name,
      main: element.main,
      base: element.base
    });
  });

  singleSpa.start();
}

bootstrap()

