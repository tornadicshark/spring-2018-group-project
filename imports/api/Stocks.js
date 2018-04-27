/** 
 * Stocks Collection:
 * 
 * name         stock name/type
 * date         date of the values listed
 * open         the open for the day (info only)
 * high         (info only)
 * low          (info only)
 * close        closing price for the day
 * volume       how many shares are owned (info only)
 * marketCap    total of the market space (info only)
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Stocks = new Mongo.Collection('stocks');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('stocks', function getStocks() {
      return Stocks.find({});
    });

/*
	var libs = [];
	libs = JSON.parse(Assets.getText("libs.json"));
    _.each(libs.libs, function (data) {
  	   console.log(libs);
       Libs.insert(data);
       _.each(libs.dependencies, function(deps) {
    	Libs.dependencies.insert(deps);
    });
  });*/
  }

  //does not work
  //mongoimport -h localhost --port 3001 --d meteor --collection stocks --type json --file /Users/kassandrawalker/Documents/Meteor/isdi-sp18-group-project/public/data/todaysData.json --jsonArray	
  
