import {protractor} from 'protractor';

/// <reference path="../pageObject/loginScreen.ts" />
/// <reference path="../pageObject/productCategoryScreen.ts" />
/// <reference path="../../../main/types/RegistrationForm.ts" />


import {RegistrationForm}  from '../../../main/types/RegistrationForm';

let _ = require('lodash');
let fs = require('fs-extra');
let request = require('request');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let loginScreen  = require('../pageObject/loginScreen');
let productCategoryScreen  = require('../pageObject/productCategoryScreen');



export class Common {

  public static url = 'userIntendedUrl';
  public static secondURL = 'userSecondIntendedUrl';
  public static thirdURL = 'userThirdIntendedUrl';
  
  public static angularURL = 'http://store.demoqa.com';
  public static nonAngularURL = 'http://store.demoqa.com';
  
  public static  WAIT_MIN_TIME = 15000;
  // public static  WAIT_MAX_TIME = 60000;
  
  public static  browserWidth = 1920;
  public static  browserHeight = 1080;
  
  public static  username = 'msashok';
  public static  password = 'login$me2tool';
  
  public static localeJson = require('path').join(process.cwd(), '.tmp','NonAngularApplication','src', 'main', 'localization', 'en.json');

  constructor(){
  }

  // Common Steps for application goes here
  public loginIntoAD = (username, password) => {
    let deferred = protractor.promise.defer();
    
    loginScreen.enter('username', username).then(() => {
      loginScreen.enter('password', password).then(() => {
        loginScreen.clickOn('loginBtn').then(() => {
          deferred.fulfill(true);
        });
      });
    });
    
    return deferred.promise;
  };
  
   
   //Common functions for application goes here
  
  public  getFromData(allergyName) {
    let deferred = protractor.promise.defer();
    let form = new RegistrationForm();
  
    try {
      productCategoryScreen.get('firstName', 'getText').then((firstName: string) => {
        productCategoryScreen.get('lastName', 'getText').then((lastName: string) => {
          productCategoryScreen.get('hobby', 'getText').then((hobby: string) => {
            productCategoryScreen.get('status', 'getText').then((status) => {
              productCategoryScreen.get('uname', 'getText').then((uname) => {
                productCategoryScreen.get('email', 'getText').then((email) => {
                productCategoryScreen.get('address', 'isPresent').then((address) => {
                  
                  form.firstName = firstName;
                  form.lastName = lastName;
                  form.hobby = hobby;
                  form.status = status;
                  form.uname = uname;
                  form.email = email;
                  
                  if (address) {
                    productCategoryScreen.get('address', 'getText').then((address: string) => {
                      form.address = address.split(',  ');
                    });
                  }
                  deferred.fulfill(form);
                });
                });
              });
            });
          });
        });
      });
    } catch (err) {
      deferred.reject(err);
    }

    return deferred.promise;
  }
  
  
  // API Calls Goes Here
  
  private getAccessTokenFromAD() {
  
    let deferred = protractor.promise.defer();
  
    // Request Access Token from AD
  
    request({
      url: 'https://login.microsoftonline.com/domain.in/oauth2/token',
      method: 'POST',
      timeout: 1200000,
      form: {
        grant_type: 'password',
        client_id: '04e07795-8ddb-461a-bbee-02f9e1bf7b46',
        username: 'username',
        password: 'password',
        resource: 'https://management.core.windows.net/'
      }
    }, (error, response, body) => {
    
      if (response === undefined) {
        console.log('AD Server seems to be down');
        deferred.reject('AD Server seems to be down');
      } else if (!error && (response.statusCode == 200)) {
        console.log("Access Token Received");
        let body = JSON.parse(response.body);
        deferred.fulfill(body.access_token);
      } else {
        console.log(response);
        console.log('Error occurred while getting access token from AD :' + response.statusCode + " " + response.statusMessage);
        deferred.reject('Error occurred while getting access token from AD :' + response.statusCode + " " + response.statusMessage);
      }
    });
  
    return deferred.promise;
  }
  
  public getLocaleValue(property) {
    // console.log(Common.localeJson);
    var data = JSON.parse(fs.readFileSync(Common.localeJson));
    var propVal =  _.get(data, property );
    return propVal;
  }
}
