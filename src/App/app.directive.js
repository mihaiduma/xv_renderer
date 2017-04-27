const AppTemplate = './app/app.template.html';
import AppController from './app.controller';

import SkinableScreen from './app.skinablescreen';

class AppDirective{
    constructor(utils, $http, skinData){
		'ngInject';
        this.utils = utils;
        this.skinData = skinData;
        this.restrict = 'E';
        this.controller = AppController;
        this.controllerAs = '$ctrl';
        this.scope = {};
        this.templateUrl = AppTemplate;
        this.http = $http;
        this.link = (scope) => this.linkFunc(scope);
        this.loadedFiles = 0;
        this.totalNumber = 0;
        this.scpp;
        
    }
    
    static factory(utils, $http, skinData){
        'ngInject';
        
        return new AppDirective(utils, $http, skinData);
    }
    
    linkFunc(scope){
        this.scpp = scope;

        scope.blabla = "ceva"; 
        scope.screens = [];

        var fileList = ['skins/fullhd/settings.xml', 'skins/fullhd/InOut/style.xml'];

        for(var i = 0; i< fileList.length; i++){
            this.loadFile(fileList[i]);
        }

        this.totalNumber = fileList.length;
        this.checkcompleteFileLoad();

    }

    loadFile(path){
        var content = this.http.get(path).then( (result)=>this.successCallback(result), (result)=>this.errorCallback(result) );
    }

    successCallback(result, pth){
        var pth = result.config.url;
		var json = this.utils.getXmlAsObject(result.data);
        this.skinData.saveFileData(pth, json);

        
       this.loadedFiles ++
       this.checkcompleteFileLoad();
	}
	
	errorCallback(resullt){
        this.loadedFiles ++
        this.checkcompleteFileLoad();
	}

    checkcompleteFileLoad(){
        if( this.totalNumber == this.loadedFiles){
            this.startRendering();
        }
    }

    startRendering(){

        var screenContent = this.skinData.getFileByPath('skins/fullhd/InOut/style.xml');

        var all = this.skinData.getAll();

        this.scpp.screens = [JSON.stringify(screenContent)];

    }

    
    
    
}

export default AppDirective.factory;