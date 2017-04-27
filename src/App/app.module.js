import AppDirective from './app.directive';
import AppService from './app.service';
import SkinDataService from './app.skindataservice';
import * as jQuery from 'jquery';


import SkinableScreen from './app.skinablescreen';
import SkinElement from './app.skinelement';

let appmodule = angular.module('MainModule', []);

appmodule.directive('app', AppDirective);
appmodule.directive('skinablescreen', SkinableScreen);
appmodule.directive('skinelement', SkinElement);

appmodule.service('utils', AppService);
appmodule.service('skinData', SkinDataService);

export default appmodule.name;