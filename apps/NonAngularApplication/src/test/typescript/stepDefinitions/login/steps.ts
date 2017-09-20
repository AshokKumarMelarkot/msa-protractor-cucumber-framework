/// <reference path="../common.ts" />
/// <reference path="../../pageObject/Application.ts" />

import {Application}  from '../../pageObject/Application';
import {Common}  from '../common';
import {browser} from 'protractor';


let steps = function () {
	
	let fs = require('fs-extra');
	let cmn = new Common();
	let application = new Application();
	let loginScreen = require('../../pageObject/loginScreen');
	
	this.When(/^Set the application type as non-angular$/, function (next) {
		application.isNonAngularPage(true);
		next();
	});
	
	this.When(/^Set the application type as angular$/, function (next) {
		application.isNonAngularPage(false);
		next();
	});
	
	this.Given(/^Launch Sample e-commerce application$/, function (next) {
		
		application.load(Common.nonAngularURL).then(() => {
			application.setSize(Common.browserWidth, Common.browserHeight).then(() => {
				next();
			});
		});
	});
	
	this.When(/^Click on My Account link available on right corner$/, function (next) {
		loginScreen.waitToAppear('myAccount', Common.WAIT_MIN_TIME).then(() => {
			//noinspection TypeScriptValidateJSTypes
			loginScreen.clickOn('myAccount').then(() => {
				next();
			});
		});
	});
	
	this.When(/^User already logged in then log out from application$/, function (next) {
		loginScreen.get('logoutBtn', 'isPresent').then((logoutBtn) => {
			
			if (logoutBtn) {
				//noinspection TypeScriptValidateJSTypes
				loginScreen.clickOn('logoutBtn').then(() => {
					loginScreen.waitToDisappear('logoutBtn', Common.WAIT_MIN_TIME).then(() => {
						next();
					});
				});
			} else {
				next();
			}
		});
	});
	
	this.When(/^Wait until login to the application$/, function (next) {
		
		loginScreen.waitToAppear('logoutBtn', Common.WAIT_MIN_TIME).then(() => {
			next();
		});
	});
	
	this.When(/^Login to portal account with user (.*) and password (.*)$/, function (uname, password, next) {
		loginScreen.get('logoutBtn', 'isPresent').then((logoutBtn) => {
			if (!logoutBtn) {
				console.log(uname);
				console.log(password);
				cmn.loginIntoAD(uname, password).then(() => {
					next();
				});
			} else {
				console.log('User already logged in..');
				next();
			}
		});
	});
	
	this.When(/^Login to application with valid credentials$/, function (next) {
		loginScreen.get('logoutBtn', 'isPresent').then((logoutBtn) => {
			
			if (!logoutBtn) {
				cmn.loginIntoAD(Common.username, Common.password).then(() => {
					next();
				});
			} else {
				console.log('User already logged in..');
				next();
			}
		});
	});
	
	this.Then(/^Should display (.*) on login screen$/, function (validationMessage, next) {
		loginScreen.waitToAppear('errorMessage', Common.WAIT_MIN_TIME).then(() => {
			loginScreen.check('errorMessage', validationMessage).then(() => {
				next();
			});
		});
	});
	
	this.registerHandler('BeforeFeatures', function (features, callback) {
		console.log('***************** Inside BeforeFeature ********************');
		callback();
	});
	
	this.registerHandler('BeforeFeature', function (scenarios, callback) {
		callback();
	});
	
	this.registerHandler('AfterFeature', function (feature, next) {
		
		console.log('*****************inside AfterFeature********************');
		next();
	});
	
	this.After(function (scenario, next) {
		console.log('*****************inside After********************');
		//noinspection TypeScriptUnresolvedFunction
		if (scenario.isFailed()) {
			attachScreenShotForFailure(browser, scenario, next);
		} else {
			next();
		}
	});
	
	function attachScreenShotForFailure(browserClone, scenario, next) {
		browserClone['takeScreenshot']().then(function (png) {
			let decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
			scenario.attach(decodedImage, 'image/png');
			next();
		});
	}
	
};

module.exports = steps;
