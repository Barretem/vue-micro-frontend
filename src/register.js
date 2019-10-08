// import '../libs/es6-promise.auto.min'
import * as singleSpa from 'single-spa';

// 普通路径模式
export function pathPrefix(app) {
    return function (location) {
        let isShow = false
        //如果该应用 有多个需要匹配的路劲
        if(isArray(app.path)){
            app.path.forEach(path => {
                if(location.pathname.indexOf(`${path}`) === 0){
                    isShow = true
                }
            });
        }
        // 普通情况
        else if(location.pathname.indexOf(`${app.path || app.url}`) === 0){
            isShow = true
        }
        return isShow;
    }
}
export async function registerApp(params) {
    //准备自定义的props,传入每一个单独工程项目
    console.error(params.main);
    singleSpa.registerApplication(params.name, () => SystemJS.import(params.main), params.base ? (() => true) : pathPrefix(params));
}

function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}