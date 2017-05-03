class AppService{
    constructor($http){
        'ngInject';
		this.http = $http;
		this.jquerry = $;
		this.callback;
    }
	
	getXmlAsObject(str){
		var xml = this.jquerry.parseXML(str);
		var json = this.xmlToJson(xml);
		var json = json.Children[0];

		return json;
	}


	isPercentValue(strValue){
			if(strValue != null){
				var arrValues = strValue.split("%");
				if(arrValues.length > 1){
					return true;
				}else{
					return false;
				}			
			}else{
				return false;
			}
		}
		
	convertPercentToNumeric(strPercent, fullValue){
			var returnValue = 0;
			var intPercent =  Number( strPercent.replace("%", "")) ;
			
			returnValue = Math.round( (fullValue * intPercent ) / 100 );
			
			return returnValue;
		}



	// Changes XML to JSON
	xmlToJson (xml) {
		
		// Create the return object
		var obj = {};

		if(xml.nodeName && xml.nodeName != "#text"){
			obj["type"] = xml.nodeName;
			obj.Children = [];
		}

		if (xml && xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj[attribute.nodeName] = attribute.nodeValue;
				}
			}
		}

		// do children
		if (xml && xml.hasChildNodes() ) {
			
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				
				if( obj["type"] ){
					var aaa = this.xmlToJson(item);
					if( aaa["type"] ){
						obj.Children.push ( aaa );
					}
					
				}
			}
		}
		return obj;
	}

	
}

export default AppService;