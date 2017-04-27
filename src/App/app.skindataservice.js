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

	getArrayByName(strname){

		var settings = this.data["skins/fullhd/settings.xml"];
		for(var i = 0; i < settings.Children.length; i++){
			if( settings.Children[i].type == strname){
				return settings.Children[i];
			}
		}

	}

	getColor(name){
		console.log(name);

		var colors = this.getArrayByName("ColorStyles");
		
		for(var i = 0; i < colors.Children.length; i++){
			console.log(colors.Children[i].name+" == "+name);
			if( colors.Children[i].name == name){
				return colors.Children[i].color;
			}
		}
	}
	
}

export default SkinDataService;