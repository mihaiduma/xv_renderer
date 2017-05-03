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
        var crtSkin = this.skinData.getCrtSkinProps();

        ///////// start responsiveCalculations /////////////////////
        if(this.utils.isPercentValue(this.generalProps.width) ){
            this.generalProps.width = this.utils.convertPercentToNumeric(this.generalProps.width, crtSkin.width);
            this.generalProps.usableWidth = this.generalProps.width;
        }
        
        if(this.utils.isPercentValue(this.generalProps.height) ){
            this.generalProps.height = this.utils.convertPercentToNumeric(this.generalProps.height, crtSkin.height);
            this.generalProps.usableHeight = this.generalProps.height;
        }		
        
        if(this.utils.isPercentValue(this.generalProps.x) ){
            this.generalProps.x = this.utils.convertPercentToNumeric(this.generalProps.x, crtSkin.width)
        }
        
        if(this.utils.isPercentValue(this.generalProps.y) ){
            this.generalProps.y = utils.convertPercentToNumeric(this.generalProps.y, crtSkin.height)
        }
        ////////// end responsive calculations ///////////////

        


        var stl = "position:absolute; ";
        
        if(this.generalProps.width){
            stl += "width: " +this.generalProps.width+ "px;";
        }

        if(this.generalProps.height){
            stl += "height: " +this.generalProps.height+ "px;";
        }

        

        if(this.generalProps.type == "Text"){

            // woraround for the fact that vertical-align:middle; does nto work with   position: absolute; 
            // so the parent received the position end the text is the only child of the parent with relative position
            var stl_parent = "position:absolute;";
            if(this.generalProps.x){
                stl_parent += "left: " +this.generalProps.x+ "px;";
            }

            if(this.generalProps.y){
                stl_parent += "top: " +this.generalProps.y+ "px;";
            }
            
            if(this.generalProps.width){
                stl_parent += "width: " +this.generalProps.width+ "px;";
            }

            if(this.generalProps.height){
                stl_parent += "height: " +this.generalProps.height+ "px;";
            }

            //stl += "position:relative; border-width: 2px; border-style: solid; border-color: red; display:inline-block;  display: table-cell;";
            stl += "position:relative; display:inline-block;  display: table-cell;";
            var objStyle = this.skinData.getStyleByName(this.generalProps.textFormat);
            
             stl += "text-align:"+objStyle.align+"; ";
             stl += "vertical-align:"+objStyle.vAlign+" !important; ";
             stl += "font-family:"+objStyle.font+"; ";
             stl += "font-size:"+objStyle.size+"px; ";
             stl += "color:"+objStyle.strcolor+"; ";
            
            stl += "left: 0px;";
            stl += "top: 0px;";

            console.log( objStyle.strcolor );
        }else{
            if(this.generalProps.x){
                stl += "left: " +this.generalProps.x+ "px;";
            }

            if(this.generalProps.y){
                stl += "top: " +this.generalProps.y+ "px;";
            }
        }

        if( this.generalProps.type == "Shape" ){
             var objStyle = this.skinData.getShapeStyleByName(this.generalProps.style);
            stl += 'background-color: '+objStyle.strcolor+'; ';
            stl += 'overflow: hidden; ';
            stl += 'opacity: '+this.generalProps.alpha+'; ';
            stl += ' border-width: '+objStyle.borderSize+'px; ';
            stl += ' border-color: '+objStyle.strBorderColor+'; ';;
            stl += ' border-style: solid; ';

            if(objStyle.shapeType == "circle"){
               var radius = Math.round( Math.min( Number(this.generalProps.width), Number(this.generalProps.height)) - (objStyle.borderSize*4) ); 
                stl += "border-radius: 50%; ";
                stl += "width: " +radius+ "px;";
                stl += "height: " +radius+ "px;";
            
            }else if( objStyle.shapeType == "triangle" ) {
                stl += "width: 0;";
                stl += "height: 0;";
                stl += "border-top: 60px solid transparent;";
                stl += "border-bottom: 60px solid transparent;";
                stl += "border-left: 60px solid green;";

                if(objStyleorientation == "left"){
					
				}else if (objStyleorientation == "right"){
					
				}else if(objStyleorientation == "down"){
					
				}else { // else top 
					//shape.rotation = 360;
				}
            
            }else{
                stl += ' border-radius: '+objStyle.cornerRadius+'px; ';
            }


        }
        
        var url = "";
        if( this.generalProps.fileName && this.generalProps.fileName.indexOf("[common]") != -1 ){	
            url = "skins/"+this.generalProps.crtSkin+"/common/" + this.generalProps.fileName.split("[common]").join("");
        }else if( this.generalProps.fileName ){
            url = "skins/"+this.generalProps.crtSkin+"/" + this.generalProps.screen  +"/" + this.generalProps.fileName;
        }
        
        this.scp.url        = url;
        this.scp.stl        = stl;
        this.scp.stl_parent = stl_parent;
        

        for (var i = 0; i <  this.generalProps.Children.length; i++){
            this.generalProps.Children[i].screen = this.generalProps.screen;
             this.generalProps.Children[i].crtSkin = this.generalProps.crtSkin;
            
        }

        this.scp.generalProps = this.generalProps;

    }
    
}

export default SkinElement.factory;