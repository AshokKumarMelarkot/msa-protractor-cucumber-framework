import {browser, protractor} from 'protractor';

export class BrowserInteractions {
	
	constructor() {
	}
	
	private createNewBrowserInstance(name) {
		let deferred = protractor.promise.defer();
		browser.params[name] = browser.forkNewDriverInstance();
		deferred.fulfill();
		return deferred.promise;
	}
	
	public setSize(width, height, newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		browserInstance['manage']().window().setSize(width, height).then(() => {
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public load(url, newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		browserInstance['get'](url).then(() => {
			deferred.fulfill();
		});
		return deferred.promise;
	}
	
	public isNonAngularPage(status) {
		// browser['ignoreSynchronization'] = status;
		// browser.waitForAngularEnabled(false);
		browser.ignoreSynchronization = status;
	}
	
	private waitForAngularPage(time) {
		browser.wait(() => {
			return browser.executeScript('return !!window.angular');
		}, time, 'Timed out waiting for angular after login page');
	}
	
	private switchToNewWindow(newBrowserInstance?: any) {
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		let deferred = protractor.promise.defer();
		
		browserInstance.getAllWindowHandles().then(function (handles) {
			console.log('******handles***', handles.length);
			
			browserInstance.switchTo().window(handles[handles.length - 1]).then(function () {
				deferred.fulfill();
			});
		});
		
		return deferred.promise;
	}
	
	
	private closeNewWindow(newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		try {
			browserInstance.getAllWindowHandles().then(function (handles1) {
				if (handles1.length > 1) {
					browserInstance.switchTo().window(handles1[handles1.length - 1]).then(function () {
						browserInstance.close();
						browserInstance.getAllWindowHandles().then(function (handles2) {
							browserInstance.switchTo().window(handles2[handles2.length - 1]).then(function () {
								browserInstance.sleep(5000);
								deferred.fulfill("The Window is closed");
							});
						});
					});
				} else {
					deferred.fulfill("The Window is already closed.");
				}
			});
		} catch (e) {
			deferred.fulfill("Got some exception while closing the window");
		}
		
		return deferred.promise;
	}
	
	
	private switchToMainWindow() {
		
		let deferred = protractor.promise.defer();
		
		browser.getAllWindowHandles().then(function (handles) {
			console.log('******handles switchToMainWindow ***', handles.length);
			browser.params.windowHandlesCount = handles.length;
			browser.switchTo().window(handles[0]).then(function () {
				browser.sleep(3000);
				browser.executeScript('window.focus();');
				console.log('****** switchToMainWindow to focus ***');
				deferred.fulfill();
			});
		});
		
		return deferred.promise;
	}
	
	
	private closeAllBrowserTabs(newBrowserInstance?: any) {
		let deferred = protractor.promise.defer();
		let browserInstance = newBrowserInstance ? newBrowserInstance : browser;
		
		try {
			browserInstance.getAllWindowHandles().then(function (handles) {
				
				let count = handles.length;
				let close = (browsersCount) => {
					
					if (browsersCount > 1) {
						browserInstance.switchTo().window(handles[handles.length - 1]).then(function () {
							browserInstance.close();
							browserInstance.getAllWindowHandles().then(function (handles) {
								browserInstance.switchTo().window(handles[handles.length - 1]).then(function () {
									browserInstance.sleep(5000);
									count = count - 1;
									close(count);
									deferred.fulfill("The Window is closed");
								});
							});
						});
						if (browsersCount == 1) {
							browserInstance.getAllWindowHandles().then(function (handles) {
								browserInstance.switchTo().window(handles[handles.length - 1]).then(function () {
									browserInstance.sleep(5000);
									count = count - 1;
									close(count);
									deferred.fulfill("The Window is closed");
								});
							});
						}
					} else {
						deferred.fulfill("The Window is already closed.");
					}
				};
				close(count);
				
			});
		} catch (e) {
			deferred.fulfill("Got some exception while closing the window");
		}
		
		return deferred.promise;
	}
	
	
}
