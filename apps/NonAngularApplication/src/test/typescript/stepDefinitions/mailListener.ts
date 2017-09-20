import {browser, element, by, By, $, $$, ExpectedConditions, protractor} from 'protractor';

var path = require('path');
var MailListener = require("mail-listener3");

export class Mailer {
    
    public mailObject:any;
    
    constructor(){
    }
    
    public getEmailContentWith(subject?:string, body?:string){
        
        var deferred = protractor.promise.defer();
        
        var mailListener = new MailListener({
            username: "variaanhalo@gmail.com",
            password: "zgbluutbqqpttdtt", // V@rianhalo
            // username: "varianpsestaging@gmail.com",
            // password: "V@rian02", // V@rianhalo
            host: "imap.gmail.com",
            port: 993, // imap port
            //connTimeout: 100, // Default by node-imap
            //authTimeout: 500, // Default by node-imap,
            tls: true,
            debug: console.log,
            fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: "INBOX", // mailbox to monitor
            //searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
            //searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
            markSeen: true, // all fetched email willbe marked as seen and not fetched next time
            mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
            attachments: false, // download attachments as they are encountered to the project directory
            attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
        });
        
        mailListener.start();
        
        mailListener.on("server:connected", function(){
            console.log("***********************imapConnected****************************");
        });
    
        mailListener.on("mail", function(mail, seqno, attributes){
            // do something with mail object including attachments
            console.log("***********************mail.subject***************************",mail.subject);
            console.log("***********************mail***************************",mail);
    
            if(subject){
                console.log("***********************subject***************************",subject);
                console.log("***********************mail.subject.indexOf(subject)***************************",mail.subject.indexOf(subject));


                if(mail.subject.indexOf(subject) > -1){
                    console.log('******If Subject ', seqno+' - '+mail.subject);
                    deferred.fulfill(mail);
                }
            }else if(body){
                console.log("***********************body***************************",body);

                if(mail.html.indexOf(body) > -1){
                    console.log('******If Body ', seqno+' - '+mail.html);
                    deferred.fulfill(mail);
                }
            }else{
                console.log('******No Matching found*******');
            }
        });
        
        mailListener.on("server:disconnected", function(){
            console.log("*****imapDisconnected");
            deferred.reject();
    
        });
    
        mailListener.on("error", function(err){
            console.log("*****Error");
            this.mailListener.stop(); // start listening
            deferred.reject(err);
        });
        
        setTimeout(function () {
            console.log("*****setTimeout");
            deferred.reject();
        }, 120000);
    
        this.mailObject = mailListener;
        
        return deferred.promise;
    }
    
    public getEmailBySubjectContains(expectedSub){
        
        var deferred = protractor.promise.defer();
        console.log("***********************Entered****************************");
    
        this.getEmailContentWith(expectedSub,'').then((email)=>{
            console.log("***********************This Is Test****************************");
            deferred.fulfill(email);
        },(err)=>{
            deferred.reject(err);
        });

        return deferred.promise;
    }
    
    public getEmailByBodyContains(expectedBody){
        
        var deferred = protractor.promise.defer();
        console.log("***********************Entered****************************");
        
        this.getEmailContentWith('',expectedBody).then((email)=>{
            console.log("***********************This Is Test****************************");
            deferred.fulfill(email);
        },(err)=>{
            deferred.reject(err);
        });
        
        return deferred.promise;
    }
    
    
    
    public disconnect(){
        
        var deferred = protractor.promise.defer();
        this.mailObject.stop();
        deferred.fulfill();
        return deferred.promise;
    }
    
}
