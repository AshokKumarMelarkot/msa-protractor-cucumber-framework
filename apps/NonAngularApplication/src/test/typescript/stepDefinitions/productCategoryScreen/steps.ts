/// <reference path="../common.ts" />
/// <reference path="../../pageObject/productCategoryScreen.ts" />

import {Common}  from '../common';
import {browser} from 'protractor';
//import {Given, When, Then, Before, BeforeFeature, After, AfterFeature} from 'cucumber';

let steps = function () {
	
	let cmn = new Common();
	let productCategoryScreen = require('../../pageObject/productCategoryScreen');
	
	this.When(/^Navigate to the iPhones category$/, function (next) {
		productCategoryScreen.hoverOn('productCategoryTab').then(() => {
			productCategoryScreen.clickOn('iPhoneSubMenu').then(() => {
				next();
			});
		});
	});
	
	this.When(/^Add (.*) product to cart$/, function (product, next) {
		productCategoryScreen.ele['itemToAdd'].value = (productCategoryScreen.ele['itemToAdd'].value).replace("ITEM_NAME", product);
		
		productCategoryScreen.clickOn('itemToAdd').then(() => {
			productCategoryScreen.ele['itemToAdd'].value = (productCategoryScreen.ele['itemToAdd'].value).replace(product, "ITEM_NAME");
			next();
		}, (e) => {
			productCategoryScreen.ele['itemToAdd'].value = (productCategoryScreen.ele['itemToAdd'].value).replace(product, "ITEM_NAME");
			throw new Error(e);
		});
	});
	
	this.When(/^Click on go to check out option$/, function (next) {
		productCategoryScreen.waitToAppear('gotToCheckOUT', Common.WAIT_MIN_TIME).then(() => {
			productCategoryScreen.clickOn('gotToCheckOUT').then(() => {
				next();
			});
		});
	});
	
	this.Then(/^The current screen should contain heading (.*)$/, function (heading, next) {
		productCategoryScreen.check('heading', heading).then(() => {
			next();
		});
	});
	
	
	this.Then(/^The item (.*) should display under cart list$/, function (product, next) {
		productCategoryScreen.getList('listOfItemsInCart', 'getText').then((listOfItemsInCart) => {
			productCategoryScreen.arrayShouldContain(listOfItemsInCart, product).then(() => {
				next();
			});
		});
	});
	
	this.Then(/^The following values should display under product category dropdown$/, function (expectedOptions, next) {
		productCategoryScreen.hoverOn('productCategoryTab').then(() => {
			productCategoryScreen.getList('listOfCategories', 'getText').then((actualOptions) => {
				let count = 0;
				console.log('actualOptions', actualOptions);
				
				var compare = (rowsCount) => {
					if (rowsCount < expectedOptions.raw().length - 1 || rowsCount == 0) {
						var str = expectedOptions.raw()[rowsCount][0];
						str = cmn.getLocaleValue(str);
						
						productCategoryScreen.arrayShouldContain(actualOptions, str).then(() => {
							// console.log('rowsCount', rowsCount);
							// console.log('str ', str);
							
							count = count + 1;
							compare(count);
						});
					}
				};
				compare(count);
				
			}).then(() => {
				next();
			});
		});
	});
	
	
};

module.exports = steps;
