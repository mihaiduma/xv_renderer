const AppTemplate = './app/app.skinablescreen.html';
import AppController from './app.controller';

class SkinableScreen{
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
        this.screenGeneralProps;
        this.elemProperties;
        this.scp;
    }
    
    static factory(utils, $http, skinData){
        'ngInject';
        
        return new SkinableScreen(utils, $http, skinData);
    }
    
    linkFunc(scope){
        this.scp = scope;
        this.jsondata       = scope.details;
        this.screenGeneralProps   = JSON.parse(this.jsondata); 
        console.log( this.screenGeneralProps );

        if(this.screenGeneralProps && this.screenGeneralProps.Children && this.screenGeneralProps.Children[0] && this.screenGeneralProps.Children[0].type == "ElementProperties"){
            this.elemProperties = this.screenGeneralProps.Children[0];
        }

        var objState = this.filterStates(this.screenGeneralProps);	
		objState.type = "Container";

        this.addElementToContainer(objState);
    }

    addElementToContainer( objState ){
        this.scp.children = objState.Children;
    }

	filterStates(objToFilter){
			
        var stateValidated = false;
        if(objToFilter && objToFilter.Children)
        {
            for(var i = objToFilter.Children.length - 1; i >= 0; i--){
                var elem = objToFilter.Children[i];
                if(elem.type == "State"){
                    var valid = this.validateState(elem, stateValidated);
                    if(!valid){
                        objToFilter.Children.splice(i, 1);
                    }else{
                        stateValidated = true;
                        objToFilter.Children.splice(i, 1);
                        if(elem.Children && elem.Children.length > 0){
                            for(var j = elem.Children.length-1; j >= 0; j--){
                                objToFilter.Children.splice(i, 0, elem.Children[j]);
                            }						
                        }
                    }
                }
                
                if(elem && elem.Children && elem.Children.length > 0 ){
                    var aaa = this.filterStates(elem);
                }
            }
            return objToFilter;
        }
        return {};
    }
    
    validateState(stateObj, stateValidated){
        
        if(stateValidated == false){
            return true;
        }else{
            return false;
        }
        
    }


    
}

export default SkinableScreen.factory;