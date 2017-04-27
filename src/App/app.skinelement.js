const AppTemplate = './app/app.skinelement.html';
import AppController from './app.controller';

class SkinElement{
    constructor(utils, $http, skinData){
		'ngInject';
        this.utils = utils;
        this.skinData = skinData;
        this.restrict = 'E';
        this.scope = {details:'@'};
        this.controller = AppController;
        this.controllerAs = '$ctrl';
        this.templateUrl = AppTemplate;
        this.http = $http;
        this.link = (scope) => this.linkFunc(scope);
        this.loadedFiles = 0;
        this.totalNumber = 0;
        this.jsondata;
        this.generalProps;
        this.scp;
    }
    
    static factory(utils, $http, skinData){
        'ngInject';
        
        return new SkinElement(utils, $http, skinData);
    }
    
    linkFunc(scope){
        this.scp = scope;
        this.scp.generalProps = {};
        this.jsondata       = scope.details;

        this.generalProps   = JSON.parse(this.jsondata); 
        




        var stl = "position:absolute; ";
        if(this.generalProps.x){
             stl += "left: " +this.generalProps.x+ "px;";
        }

        if(this.generalProps.y){
            stl += "top: " +this.generalProps.y+ "px;";
        }
        
        if(this.generalProps.width){
            stl += "width: " +this.generalProps.width+ "px;";
        }

        if(this.generalProps.height){
            stl += "height: " +this.generalProps.height+ "px;";
        }

        if(this.generalProps.type == "Text"){
            stl += "border-width: 2px; border-style: solid; border-color: red;";
            var objStyle = this.skinData.getStyleByName(this.generalProps.textFormat);
            
             stl += "text-align:"+objStyle.align+"; ";
             stl += "vertical-align:"+objStyle.vAlign+" !important; ";
             stl += "font-family:"+objStyle.font+"; ";
             stl += "font-size:"+objStyle.size+"px; ";
             stl += "color:"+objStyle.strcolor+"; ";
            
            console.log( objStyle.strcolor );
        }
        
        var url = "";
        if( this.generalProps.fileName && this.generalProps.fileName.indexOf("[common]") != -1 ){	
            url = "skins/fullhd/common/" + this.generalProps.fileName.split("[common]").join("");
        }else if( this.generalProps.fileName ){
            url = "skins/fullhd/InOut/" + this.generalProps.fileName;
        }
        
        this.scp.url = url;
        this.scp.stl = stl;
        this.scp.generalProps = this.generalProps;

    }
    
}

export default SkinElement.factory;