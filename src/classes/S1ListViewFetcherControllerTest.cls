@isTest
private class S1ListViewFetcherControllerTest {
	
	@isTest static void test_method_one() {
		String ret = '';
		ret = S1ListViewFetcherCotroller.getObjects(true);
		ret = S1ListViewFetcherCotroller.getObjects(false);
		String q =  EncodingUtil.urlEncode('%new%','UTF-8');
		ret = S1ListViewFetcherCotroller.getListViews(q, 'Account');

		System.assert(ret!=null);

	}
	
	
}