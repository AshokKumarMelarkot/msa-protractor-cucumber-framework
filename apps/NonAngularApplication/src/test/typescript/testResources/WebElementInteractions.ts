import {browser, element, by, $, protractor} from 'protractor';


export class ElementInteraction {
	
	ele: any;
	
	constructor(elem) {
		this.ele = elem;
	}
	
	//Below one is the interactions for an element
	
	
	public get(key, method, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance['element'](by[this.ele[key].type](this.ele[key].value))[method]();
	}
	
	getAttValueORCSSValue(key, method, parameter, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance['element'](by[this.ele[key].type](this.ele[key].value))[method](parameter);
	}
	
	//Below one is the interactions for list of elements
	
	
	public getList(key, method, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance['element']['all'](by[this.ele[key].type](this.ele[key].value))[method]();
	}
	
	 getListAttValueORCSSValue(key, method, parameter) {
		return browser['element']['all'](by[this.ele[key].type](this.ele[key].value))[method](parameter);
	}
	
	
	
	//Events on elements
	
	 public enter(key, text, newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		//noinspection TypeScriptValidateJSTypes
		 browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).clear().then(() => {
			//noinspection TypeScriptValidateJSTypes
			 browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).sendKeys(text).then(() => {
				deferred.fulfill();
			});
		}, () => {
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	enterWithOutClearingText(key, text, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).sendKeys(text);
	}
	
	 public clickOn(key, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).click();
	}
	
	 doubleClickOn(key, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance.actions().doubleClick(browserInstance['findElement'](by[this.ele[key].type](this.ele[key].value))).perform();
	}
	
	 hoverOn(key, newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		browserInstance.actions().mouseMove(browserInstance['findElement'](by[this.ele[key].type](this.ele[key].value))).perform().then(() => {
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public clearTextField(key, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		return browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).clear();
	}
	
	 select(key, item, newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		//noinspection TypeScriptValidateJSTypes
		 browserInstance['element'](by[this.ele[key].type](this.ele[key].value)).click().then(() => {
			let dropDownPopup:any = browserInstance['element'](by.css('div.md-select-menu-container[aria-hidden=false]'));
			let EC = protractor.ExpectedConditions;
			browserInstance.wait(EC.visibilityOf(dropDownPopup), 8000).then(() => {
				//noinspection TypeScriptValidateJSTypes,TypeScriptUnresolvedFunction
				dropDownPopup.element(by.cssContainingText('md-option', item)).click().then(() => {
					deferred.fulfill();
				});
			}, () => {
				//noinspection TypeScriptValidateJSTypes,TypeScriptUnresolvedFunction
				dropDownPopup.element(by.cssContainingText('md-option', item)).click().then(() => {
					deferred.fulfill();
				});
			});
		});
		return deferred.promise;
	}
	
	 waitFor(key, time, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let EC = protractor.ExpectedConditions;
		let deferred = protractor.promise.defer();
		
		browserInstance.wait(EC.elementToBeClickable(browserInstance['driver']['findElement'](['By'][this.ele[key].value])), time).then(() => {
			deferred.fulfill();
		}, () => {
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	public waitToDisappear(key, time, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let EC = protractor.ExpectedConditions;
		let deferred = protractor.promise.defer();
		console.log('Waiting to disappear...',key);
		
		browserInstance.wait(EC.invisibilityOf(browserInstance['$'](this.ele[key].value)), time).then(() => {
			console.log('Element Disappeared...');
			deferred.fulfill();
		}, () => {
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	 public waitToAppear(key, time, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let EC = protractor.ExpectedConditions;
		let deferred = protractor.promise.defer();
		 console.log('Waiting...',key);
		
		 browserInstance.wait(EC.visibilityOf(browserInstance['$'](this.ele[key].value)), time).then(() => {
			 // console.log('Element found...');
			 deferred.fulfill();
		}, () => {
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	public waitToPresence(key, time, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let EC = protractor.ExpectedConditions;
		let deferred = protractor.promise.defer();
		
		browserInstance.wait(EC.presenceOf(browserInstance['$'](this.ele[key].value)), time).then(() => {
			deferred.fulfill();
		}, () => {
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	 waitToAbsent(key, time, newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let EC = protractor.ExpectedConditions;
		let deferred = protractor.promise.defer();
		
		browserInstance.wait(EC.stalenessOf(browserInstance['$'](this.ele[key].value)), time).then(() => {
			deferred.fulfill();
		}, () => {
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	 getLocators(key) {
		return browser['element']['all'](by[this.ele[key].type](this.ele[key].value));
	}
}
