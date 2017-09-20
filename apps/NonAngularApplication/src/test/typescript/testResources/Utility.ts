import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';
import {Assertions} from './Assertions';

let chai = require('chai');
let expect = chai.expect;
chai.use(require("chai-sorted"));
let randomString = require('random-string');
let _ = require('lodash');
let intersection = require('lodash.intersection');
let difference = require('lodash.difference');

export class Utility extends Assertions {

   constructor(elem){
    super(elem);
   }

    //All Helper functions goes here like modifying the strings, dates ....etc.

    public toBeTrue(expectedVal){
        let deferred = protractor.promise.defer();
        expect(expectedVal,"The "+expectedVal+" should equal to true").to.be.true;
        deferred.fulfill();
        return deferred.promise;
    }

    public arrayShouldContain(arr, val){
      let deferred = protractor.promise.defer();

      if(arr){
        expect(val,"The array "+arr+" should contain the property "+val).to.be.oneOf(arr);
        deferred.fulfill();
      }else {
        expect(val,"The array "+arr+" should contain the property "+val).to.be.oneOf(arr);
        deferred.reject();
      }
      return deferred.promise;
    }
  
   //Need to modify this function as there is not error case handled.
  public arrayShouldContainPartialText(arr, val){
    let expected;
    let deferred = protractor.promise.defer();
    
    if(arr){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(val) > -1) {
          expected = arr[i];
          expect(expected,"The array "+arr+" should contain the property "+val).to.contain(val);
          deferred.fulfill();
          break;
        }
      }
    }else {
      expect(val,"The array "+arr+" should contain the property "+val).to.be.oneOf(arr);
      deferred.reject();
    }
    
    return deferred.promise;
  }
  
    public arrayShouldNotContain(arr, val){
      let deferred = protractor.promise.defer();

      if(arr){
        expect(val,"The array "+arr+" should contain the property "+val).to.not.be.oneOf(arr);
        deferred.fulfill();
      }else {
        expect(val,"The array "+arr+" should contain the property "+val).to.not.be.oneOf(arr);
        deferred.reject();
      }
      return deferred.promise;
    }

    public numbersShouldBeEqual(expectedCount:number, actualCount:number){
        let deferred = protractor.promise.defer();
        expect(expectedCount,"The value1 "+expectedCount+" should equal to Value2 "+ actualCount).to.equal(actualCount);
        deferred.fulfill();
        return deferred.promise;
    }
  
    public numbersShouldBeAbove(expectedCount:number, actualCount:number){
      let deferred = protractor.promise.defer();
      expect(expectedCount,"The value1 "+expectedCount+" should greater than to Value2 "+ actualCount).to.be.above(actualCount);
      deferred.fulfill();
      return deferred.promise;
    }
  
    public numbersShouldBeBelow(expectedCount:number, actualCount:number){
      let deferred = protractor.promise.defer();
      expect(expectedCount,"The value1 "+expectedCount+" should less than to Value2 "+ actualCount).to.be.below(actualCount);
      deferred.fulfill();
      return deferred.promise;
    }

    public numbersShouldBeLessOrEqual(actualCount:number, expectedCount:number){
        let deferred = protractor.promise.defer();
        expect(actualCount,"The value1 "+actualCount+" should less than to Value2 "+ expectedCount).to.be.at.most(expectedCount);
        deferred.fulfill();
        return deferred.promise;
    }

    public numbersShouldBeEqualOrMore(actualCount:number, expectedCount:number){
        let deferred = protractor.promise.defer();
        expect(actualCount,"The value1 "+actualCount+" should less than to Value2 "+ expectedCount).to.be.at.least(expectedCount);
        deferred.fulfill();
        return deferred.promise;
    }

    public textShouldEqual(expected:string, actual:string){
        let deferred = protractor.promise.defer();
        expect(expected,"The value1 "+expected+" should equal to Value2 "+ actual).to.equal(actual);
        deferred.fulfill();
        return deferred.promise;
    }
  
  public textShouldEitherEqual(textToCompare:string, option1:string, option2:string){
    let deferred = protractor.promise.defer();
    
    expect(textToCompare,"The text "+textToCompare+" should contain either "+ option1+" or "+ option2).to.satisfy(function(option1, option2){
      return textToCompare.indexOf(option1)> -1 || textToCompare.indexOf(option2)> -1 ? true : false;
    });
    
    deferred.fulfill();
    return deferred.promise;
  }
  
  public textShouldContain(expected:string, actual:string){
    let deferred = protractor.promise.defer();
    expect(expected,"The value1 "+expected+" should contain to Value2 "+ actual).to.contain(actual);
    deferred.fulfill();
    return deferred.promise;
  }

 public textShouldNotContain(expected:string, actual:string){
  let deferred = protractor.promise.defer();
  expect(expected,"The value1 "+expected+" should not contain to Value2 "+ actual).not.to.contain(actual);
  deferred.fulfill();
  return deferred.promise;
 }
  
  public textShouldNotEqual(expected:string, actual:string){
    let deferred = protractor.promise.defer();
    expect(expected,"The value1 "+expected+" should not equal to Value2 "+ actual).not.to.equal(actual);
    deferred.fulfill();
    return deferred.promise;
  }

  /*
  * first parameter should be less than second
  * second parameter should be greater than first
   * condition like Actual < Expected OR Actual > Expected
  * */
  public numbersShouldGreaterThan(expectedCount:number, actualCount:number){
      let deferred = protractor.promise.defer();
      expect(actualCount,"The Value2 "+actualCount+" should be greater than Value1 "+ actualCount).to.be.above(expectedCount);
      deferred.fulfill();
      return deferred.promise;
  }

  public shouldBeSorted(expectedArr){
      let deferred = protractor.promise.defer();

      try{
          // expect(expectedArr, "The expected Array values - "+expectedArr+" should be sorted in ascending order").to.be.sorted();
          deferred.fulfill();
        }catch(err){
          deferred.reject(err);
        }
      return deferred.promise;
   }

  public shouldBeSortedDescending(expectedArr){
        let deferred = protractor.promise.defer();

        try{
            // expect(expectedArr, "The expected Array values - "+expectedArr+" should be sorted in descending order").to.be.sorted(true);
            deferred.fulfill();
        }catch(err){
            deferred.reject(err);
        }
        return deferred.promise;
  }

   public getNumber(text)
   {
      let r = /\d+/;
      return Number(text.match(r));
   }

   public notContainsText(expectedText, actualText){
     let deferred = protractor.promise.defer();
     try{
        expect(expectedText,"The expected Text value - "+expectedText+" should contain Actual Text Value "+ actualText).to.not.contains(actualText);
        deferred.fulfill();
         }
     catch(err){
        deferred.reject();
        }
     return deferred.promise;
  }

  public arrayShouldBeEqual(expectedArr, actualArr)
   {
      let deferred = protractor.promise.defer();
      expect(actualArr, "The expected Array values - "+expectedArr+" should be Equal to Actual Array Values "+ actualArr).to.deep.equal(expectedArr);
      deferred.fulfill();
      return deferred.promise;
   }
  
  public arrayShouldBeEqualIrrespectiveIndex(expectedArr, actualArr) {
	let deferred = protractor.promise.defer();
	expect(actualArr, "The expected Array values - "+expectedArr+" should be Equal to Actual Array Values Irrespective wuth order "+ actualArr).to.have.members(expectedArr);
	deferred.fulfill();
	return deferred.promise;
}

   public randomStringLengthMoreThan(limit:number)
   {
      return randomString({length: (limit + 1), numeric: true, letters: true});
   }

    public randomSpecialStrLengMoreThan(limit:number)
    {
        return randomString({length: (limit + 1), numeric: true, letters: true, special: true});
    }

  public arrayShouldBeMutualExc(arr1, arr2)
   {
     function intersect(a, b) {
        let t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
            return a.filter(function (e) {
        return b.indexOf(e) > -1;
        });
     }

    let deferred = protractor.promise.defer();
    let mutualExclusion = intersect(arr1, arr2);
    expect(mutualExclusion, "The Mutual exclusion of Array values - "+arr1+" and  " + arr2 + " should be Empty").to.be.empty;
    deferred.fulfill();
    return deferred.promise;
   }

    public eachArrayItemShouldContain(arr, expectedValue)
    {
        function shouldContainValue(eachArrEle) {
            return eachArrEle.includes(expectedValue);
        }
        let deferred = protractor.promise.defer();
        expect(arr.every(shouldContainValue), "Array - " + arr + " : Each element should contain - " + expectedValue).to.be.true;
        deferred.fulfill();
        return deferred.promise;
    }

    public getCommonArray(arr1, arr2)
    {
        return _.intersection(arr1, arr2);
    }

    public getDifferenceArray(arr1, arr2)
    {
        return _.difference(arr1, arr2);
    }

    public str2Contain(str, text)
    {
        if(str.length == text.length)
            return str.endsWith(text);
        else
            return false;
    }

    public removeEmptyStr(arr)
    {
        return _.without(arr, "");
    }

    public eachElement2Contain(arr, expectedArrValue, typeOption)
    {
        function toContain() {
            let i;
            let j;
            let count = 0;
            for(i = 0; i < arr.length; i++) {
                for(j=0; j< expectedArrValue.length; j++){
                    if ((arr[i].includes(expectedArrValue[j])) && !(arr[i].includes('FW:')) && !(arr[i].includes('RE:'))) {
                        count = count + 1;
                        break;
                    }
                }
            }
            return count;
        }
        let deferred = protractor.promise.defer();
        if(typeOption == "Other") // Should not contain
        {
            let cond = toContain() == 0;
            expect(cond, "Array - " + arr + " : Each element should not contain either of - " + expectedArrValue).to.be.true;
        }
        else // each ele should contain
        {
            let cond = toContain() == arr.length;
            expect(cond, "Array - " + arr + " : Each element should contain either of - " + expectedArrValue).to.be.true;
        }
        deferred.fulfill();
        return deferred.promise;
    }


       public  randomIntFromInterval(min,max){
              return Math.floor(Math.random()*(max-min+1)+min);
        }


}
