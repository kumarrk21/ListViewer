({
	showSObjectList : function(cmp,evt) {
		var filterValue = cmp.get('v.objectFilter');
		var filteredList = new Array();
		var sObjectsList = cmp.get('v.sObjects');
		if(_.size(filterValue)>0){
			filteredList = _.filter(sObjectsList,function(item){
                            return(item.label.toLowerCase().indexOf(filterValue.toLowerCase()) > -1);
             }); 
			$A.util.removeClass(cmp.find("_objectLookupListBox"),"slds-hide"); 
			$A.util.addClass(cmp.find("_selectedSObjectContainer"),"slds-hide");
			$A.util.addClass(cmp.find("_listSearchContainer"),"slds-hide");
			$A.util.addClass(cmp.find("_listItems"),"slds-hide");
		}else{
			$A.util.addClass(cmp.find("_objectLookupListBox"),"slds-hide"); 
			$A.util.removeClass(cmp.find("_selectedSObjectContainer"),"slds-hide");
			$A.util.removeClass(cmp.find("_listSearchContainer"),"slds-hide");
			$A.util.removeClass(cmp.find("_listItems"),"slds-hide");
		}
		cmp.set('v.sObjectsFiltered',filteredList)
		

	},

	hideSObjectList : function(cmp,evt) {
		var filterValue = cmp.get('v.objectFilter');
		if(_.size(filterValue)<1){
			$A.util.addClass(cmp.find("_objectLookupListBox"),"slds-hide"); 
		}	
	},

	showViewSearchButton:function(cmp,evt){
		var filterValue = cmp.get('v.listViewFilter');
		if(_.size(filterValue)>0){
			$A.util.removeClass(cmp.find("_listLookupListBox"),"slds-hide");
			$A.util.addClass(cmp.find("_listItems"),"slds-hide"); 	
		}else{
			$A.util.addClass(cmp.find("_listLookupListBox"),"slds-hide"); 
			$A.util.removeClass(cmp.find("_listItems"),"slds-hide"); 	
		}
	},

	hideViewSearchButton:function(cmp,evt){
		var filterValue = cmp.get('v.listViewFilter');
		if(_.size(filterValue)<1){
			$A.util.addClass(cmp.find("_listLookupListBox"),"slds-hide"); 
			$A.util.removeClass(cmp.find("_listItems"),"slds-hide"); 
		}	
	},

	showViewList:function(cmp,evt){
		
	}


})