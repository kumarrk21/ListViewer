public with sharing class S1ListViewFetcherCotroller {
	
	@AuraEnabled
	public static String getObjects(Boolean fromTabs){
		if(fromTabs){
				return JSON.serialize(getObjectsFromTabs());
		}else{
				return JSON.serialize(getAllObjects());
		}
		
	}

	@AuraEnabled
	public static String getListViews(String q, String sObjectType){
		q = EncodingUtil.urlDecode(q, 'UTF-8');
		List<ListView> lv = new List<ListView>();
		if(enforceCRUDFLS()){
			lv = [SELECT Id, Name, NamespacePrefix FROM ListView WHERE SObjectType=:sObjectType AND Name like:q];
		}
		
		return JSON.serialize(lv);
	}

	private static List<retObject> getObjectsFromTabs(){
		Map<String,String> retMap = new Map<String,String>();
		List<Schema.DescribeTabSetResult> tabSetDesc = Schema.describeTabs();
		for(DescribeTabSetResult tsr : tabSetDesc) {
			List<Schema.DescribeTabResult> tabDesc = tsr.getTabs();
			for(Schema.DescribeTabResult tr:tabDesc) {
				if(tr.getSobjectName()!='' && tr.getSobjectName()!=null){
					retMap.put(tr.getSobjectName(),tr.getLabel());
				}
			}
		}
		List<retObject> retList = new List<retObject>();
		for(String name:retMap.keySet()){
			retObject ret = new retObject();
			ret.name = name;
			ret.label = retMap.get(name);
			retList.add(ret);
		}
		return retList;

	}

	private static List<retObject> getAllObjects(){
		List<retObject> retList = new List<retObject>();
		Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
		for(string name:gd.keySet()){
			retObject ret = new retObject();
			Schema.DescribeSObjectResult sr = gd.get(name).getDescribe();
			if(sr.isAccessible()){
				ret.name = sr.getName();
				ret.label = sr.getLabel();
				retList.add(ret);	
			}
		}
		return retList;
	}

	private static Boolean enforceCRUDFLS(){
		if (!Schema.sObjectType.ListView.fields.Id.isAccessible()){
          return false;
        }
        if (!Schema.sObjectType.ListView.fields.Name.isAccessible()){
          return false;
        }
        if (!Schema.sObjectType.ListView.fields.NamespacePrefix.isAccessible()){
          return false;
        }
        return true;

	}	

	private class retObject{
		String name {get;set;}
		String label {get;set;}
	}

	

}