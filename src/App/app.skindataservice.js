class SkinDataService{
    constructor($http){
        'ngInject';
		this.http = $http;
		this.jquerry = $;
		this.data = {};
    }
	
	saveFileData(str, content){
		this.data[str] = content;
	}

	getFileByPath(str){
		return this.data[str];
	}

	getAll(){
		return this.data;
	}

	getStyleByName(name){
		var arrFormats = this.getArrayByName("formats");
		for(var i = 0; i < arrFormats.Children.length; i++){
			if( arrFormats.Children[i].name == name){
				var color = this.getColor(arrFormats.Children[i].color);

				color = color.split("0x").join("#");

				arrFormats.Children[i].strcolor = color;

				return arrFormats.Children[i];
			}
		}
	}

	getShapeStyleByName(name){
		var arrFormats = this.getArrayByName("ShapeStyles");
		
		for(var i = 0; i < arrFormats.Children.length; i++){
			//console.log( ">>>>>>" + arrFormats.Children[i].name+" == "+name );
			if( arrFormats.Children[i].name == name){
				var color = "";
				if(arrFormats.Children[i].color){
					color = this.getColor(arrFormats.Children[i].color);
					color = color.split("0x").join("#");
				}else{
					color = '#000000';
				}
				
				if(arrFormats.Children[i].borderColor){
					console.log( "arrFormats.Children[i].borderColor = " + arrFormats.Children[i].borderColor);
					var bcolor = this.getColor(arrFormats.Children[i].borderColor);
					bcolor = bcolor.split("0x").join("#");
				}else{
					var bcolor = '#FFFFFF';
				}
				arrFormats.Children[i].strBorderColor = bcolor;

				arrFormats.Children[i].strcolor = color;

				return arrFormats.Children[i];
			}
		}
	}

	getArrayByName(strname){

		var settings = this.data["skins/fullhd/settings.xml"];
		for(var i = 0; i < settings.Children.length; i++){
			if( settings.Children[i].type == strname){
				return settings.Children[i];
			}
		}

	}

	getColor(name){
		var colors = this.getArrayByName("ColorStyles");
		
		for(var i = 0; i < colors.Children.length; i++){
			if( colors.Children[i].name == name){
				return colors.Children[i].color;
			}
		}
	}

	getCrtSkinProps(){
		var skinobj = {};
		skinobj.width = 1280;
		skinobj.height = 1024;

		return skinobj;
	}
	
}

export default SkinDataService;