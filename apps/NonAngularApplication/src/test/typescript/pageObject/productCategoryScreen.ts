import {Utility} from '../testResources/Utility';

class ProductCategoryScreen extends Utility {
	
	constructor() {
		super({
			heading: {type: 'xpath', value: '//a[.="ONLINE STORE"]'},
			productCategoryTab: {type: 'xpath', value: '//a[.="Product Category"]'},
			listOfCategories: {type: 'xpath', value: '(//ul[ @class= "sub-menu"])[1]//li/a'},
			iPhoneSubMenu: {type: 'xpath', value: '//a[.="iPhones"]'},
			gotToCheckOUT: {type: 'css', value: '.go_to_checkout'},
			itemToAdd: {type: 'xpath', value: '//a[.="ITEM_NAME"]/../..//input[@value="Add To Cart"]'},
			listOfItemsInCart: {type: 'css', value: '.wpsc_product_name'}
		});
	}
}

module.exports = new ProductCategoryScreen();
