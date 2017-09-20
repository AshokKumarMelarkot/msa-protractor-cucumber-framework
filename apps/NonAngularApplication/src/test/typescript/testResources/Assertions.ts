import {ElementInteraction} from './WebElementInteractions';
import {browser, element, by, protractor} from 'protractor';


let chai = require('chai');
let expect = chai.expect;

export class Assertions extends ElementInteraction {
	
	constructor(elem) {
		super(elem);
	}
	
	/*
	* Assertions
	* Here we can define out custom functions to create assertions using chai or any other library
	*/
	
	
	//Use to find and assert the text of element like messages and error messages
	public check(key, expText, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		let deferred = protractor.promise.defer();
		
		browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).getText().then((actualText) => {
			expect(actualText).to.be.equal(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	// Check not equal assertion
	public checkNotEqual(key, expText) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).getText().then((actualText) => {
			expect(actualText).to.not.equal(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	
	public checkAttributeValue(key, attribute, expText) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).getAttribute(attribute).then((actualText) => {
			expect(actualText).to.be.equal(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public checkAttributeValueContains(key, attribute, expText) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).getAttribute(attribute).then((actualText) => {
			expect(actualText).to.contain(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public checkCssValueContains(key, attribute, expText) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).getCssValue(attribute).then((actualText) => {
			expect(actualText).to.contain(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	//Use to find and assert the partial text of element
	public containsText(key, expText, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let deferred = protractor.promise.defer();
		
		browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).getText().then((actualText) => {
			expect(actualText).to.contain(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public countShouldMatch(key, expCount) {
		let deferred = protractor.promise.defer();
		expCount = Number(expCount);
		browser['element']['all'](by[this.ele[key].type](this.ele[key].value)).count().then((actualCount) => {
			expect(actualCount).to.equal(expCount);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public countShouldBeGreater(key, expCount) {
		let deferred = protractor.promise.defer();
		expCount = Number(expCount);
		browser['element']['all'](by[this.ele[key].type](this.ele[key].value)).count().then((actualCount) => {
			expect(actualCount).to.be.above(expCount);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public countShouldBeLesser(key, expCount) {
		let deferred = protractor.promise.defer();
		expCount = Number(expCount);
		browser['element']['all'](by[this.ele[key].type](this.ele[key].value)).count().then((actualCount: number) => {
			expect(expCount).to.be.above(actualCount);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	//Use to find the web element assert the exist or not
	public shouldContain(key) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).isPresent().then((exist) => {
			expect(exist, "The element " + key + " should exist in page.").to.be.true;
			
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	//Use to find the web element assert the exist or not
	public shouldNotContain(key) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).isPresent().then((exist) => {
			expect(exist, "The element " + key + " should not exist in page.").to.be.false;
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	
	public shouldDisplay(key, newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).isDisplayed().then((exist) => {
			expect(exist, "The element " + key + " should display on page.").to.be.true;
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public shouldNotDisplay(key) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).isDisplayed().then((exist) => {
			expect(exist, "The element " + key + " should not display on page.").to.be.false;
			
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	//Use to assert the key1 element align the top of key2 element
	public shouldAlignTopAndBottom(key1, key2) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key1].type](this.ele[key1].value)).getLocation().then((pos1) => {
			browser['element'](by[this.ele[key2].type](this.ele[key2].value)).getLocation().then((pos2) => {
				expect(pos2.y).to.be.above(pos1.y);
				deferred.fulfill();
			});
		});
		return deferred.promise;
	}
	
	/*
	 Description : in order to assert
	 first parameter : key for element locator in page obj
	 second parameter : key for element locator in page obj
	 output :
	 */
	public shouldAlignLeftAndRight(key1, key2) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key1].type](this.ele[key1].value)).getLocation().then((pos1) => {
			browser['element'](by[this.ele[key2].type](this.ele[key2].value)).getLocation().then((pos2) => {
				expect(pos2.x).to.be.above(pos1.x);
				deferred.fulfill();
			});
		});
		return deferred.promise;
	}
	
	//Use to assert the element is disabled in page
	public shouldEnable(key) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).isEnabled().then((exist) => {
			expect(exist, "The element " + key + " should enable.").to.be.true;
			
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	//Use to assert the element is disabled in page
	public shouldDisable(key) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).isEnabled().then((exist) => {
			expect(exist, "The element " + key + " should disable.").to.be.false;
			
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public checkAttributeValueNotContains(key, attribute, expText) {
		let deferred = protractor.promise.defer();
		
		browser['element'](by[this.ele[key].type](this.ele[key].value)).getAttribute(attribute).then((actualText) => {
			expect(actualText).to.not.contain(expText);
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
}
