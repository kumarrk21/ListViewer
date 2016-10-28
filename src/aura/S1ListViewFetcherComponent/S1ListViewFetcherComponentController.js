({
	
	typeAhead : function(component, event, helper) {
		var sourceId = event.getSource().getLocalId();
		switch(sourceId){
			case '_objectFilter':
				helper.showSObjectList(component,event);
				break;
			case '_listViewFilter':
				helper.showViewSearchButton(component,event);
				break;		
			default:
				break;		
		}		
	},


	blurred: function(component,event,helper){
		var sourceId = event.getSource().getLocalId();
		switch(sourceId){
			case '_objectFilter':
				helper.hideSObjectList(component,event);
				break;
		 	case '_listViewFilter':
		 		helper.hideViewSearchButton(component,event);
		 		break;	
			default:
				break;		
		}
	},

	chooseObject:function(component,event,helper){
		var target;
		if (event.getSource) {
            target = event.getSource(); 
        } else {
            target = event.currentTarget;
		}
		var sObjects = component.get('v.sObjects');
		var sObjectSelected = _.find(sObjects,function(item){
								  return item.name==target.dataset.id;
 							  });
		component.set('v.sObjectSelectedName',sObjectSelected.name);
		component.set('v.sObjectSelectedLabel',sObjectSelected.label);
		component.set('v.objectFilter','');
		helper.hideSObjectList(component,event);
		$A.util.removeClass(component.find("_selectedSObjectContainer"),"slds-hide");
		$A.util.removeClass(component.find("_listSearchContainer"),"slds-hide");
		
	},

	chooseList:function(component,event,helper){
		var target;
		if (event.getSource) {
            target = event.getSource(); 
        } else {
            target = event.currentTarget;
		}
		var lists = component.get('v.lists');
		var sObjectSelectedName = component.get('v.sObjectSelectedName');
		var selectedList = _.find(lists,function(item){
										return item.Id == target.dataset.id;
								  });

		var navEvent = $A.get("e.force:navigateToList");
		navEvent.setParams({
                "listViewId": selectedList.Id,
                "listViewName": null,
                "scope": sObjectSelectedName
            });
        navEvent.fire();
	},


	doInit : function(cmp, evt, helper) {
		var apexMethod = cmp.get('c.getObjects');
		apexMethod.setParams({fromTabs:cmp.get('v.fromTabs')});
		apexMethod.setCallback(this,function(response){
            $A.util.addClass(cmp.find("_spinner"),"slds-hide"); 
            var state = response.getState();
            if(state == 'SUCCESS'){
            	//console.log(JSON.parse(response.getReturnValue()));
            	cmp.set('v.sObjects',JSON.parse(response.getReturnValue()));
            }else{
                //console.log("Error in calling Apex method: ", response.getError());
            }
        });
        $A.enqueueAction(apexMethod);

	},

	getList: function(cmp,evt,helper){
		$A.util.removeClass(cmp.find("_spinner"),"slds-hide"); 
		var filter = cmp.get('v.listViewFilter');
		var q = escape('%'+filter+'%');
		var apexMethod = cmp.get('c.getListViews');
		cmp.set('v.listsAvl',false);
		apexMethod.setParams({q:q,sObjectType:cmp.get('v.sObjectSelectedName')});
		apexMethod.setCallback(this,function(response){
			$A.util.addClass(cmp.find("_spinner"),"slds-hide"); 
            var state = response.getState();
            if(state == 'SUCCESS'){
            	var lists = JSON.parse(response.getReturnValue());
            	cmp.set('v.lists',lists);
            	//console.log('lists', lists);
            	if(_.size(lists)<=0){
            		cmp.set('v.listsAvl',false);
            	}else{
            		cmp.set('v.listsAvl',true);
            	}
            	//console.log('size of lists', _.size(lists));
            	$A.util.removeClass(cmp.find("_listItems"),"slds-hide");
            	$A.util.addClass(cmp.find("_listLookupListBox"),"slds-hide");
            	cmp.set('v.listViewFilter','');
            }else{
                console.log("Error in calling Apex method: ", response.getError());
            }
            //$A.util.addClass(cmp.find("_spinner"),"slds-hide");  //hide spinner    
        });
        $A.enqueueAction(apexMethod);
	}
})