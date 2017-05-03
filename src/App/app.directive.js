const AppTemplate = './app/app.template.html';
import AppController from './app.controller';

import SkinableScreen from './app.skinablescreen';

class AppDirective{
    constructor(utils, $http, skinData, $timeout){
		'ngInject';
        this.utils = utils;
        this.skinData = skinData;
        this.$timeout = $timeout;
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
    
    static factory(utils, $http, skinData, $timeout){
        'ngInject';
        
        return new AppDirective(utils, $http, skinData, $timeout);
    }
    
    linkFunc(scope){
        this.scpp = scope;

        scope.blabla = "ceva"; 
        scope.screens = [];

        var fileList = [];
        fileList.push('skins/fullhd/settings.xml');
        fileList.push('skins/fullhd/InOut/style.xml');
        fileList.push('skins/Accesibility/InOut/style.xml');
        fileList.push('skins/fullhd/dialog/ExtractCard/style.xml');
        fileList.push('skins/fullhd/dialog/orderNumberView/style.xml');
        fileList.push('skins/fullhd/dialog/keyboardScanner/style.xml');
        fileList.push('skins/fullhd/orderMain/orderList/style.xml');

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

            //this.$timeout(timed)
        }
    }

    startRendering(){

        //var screen = 'dialog/keyboardScanner';
        //var screen = 'dialog/orderNumberView';
        //var screen = 'dialog/ExtractCard';
        //THIS IS A TEST FOR UPDATES
		//THIS IS COMMIT TEST , UPDATE
        //var screen = 'InOut';
        var screen = 'orderMain/orderList';
        var crtSkin = 'fullhd';

        var screenContent = this.skinData.getFileByPath('skins/'+crtSkin+'/'+screen+'/style.xml');

        var all = this.skinData.getAll();

        screenContent.screen = screen;
        screenContent.crtSkin = crtSkin;


        this.scpp.screens = [JSON.stringify(screenContent)];

    }

    
    
    
}

export default AppDirective.factory;