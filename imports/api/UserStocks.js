/** 
 * UserStocks Collection:
 * 
 * ownerID  the username of the person who bought the stock
 * stock    name of the stock
 * amt      the amount of shares bought
 * 
 * Value of the amt will be determined by the current price of stock
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserStocks = new Mongo.Collection('userStocks');


if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('userStocks', function getUserStocks() {
    return UserStocks.find({
        ownerID: this.userId
      });
  });
}

Meteor.methods({
  'userStocks.buy' (stock, amt) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

/*
    existingStock = UserStocks.findOne({
      ownerID: this.userId,
      stock: stock
    });
    console.log("found existing stock");
    console.log(existingStock.amt + ", " + existingStock.stock);
    
    if (exisitingStock) {
      UserStocks.update(ownerID, {
        $set: {
          checked: setChecked
        }
      });
    }*/

    UserStocks.insert({
      ownerID: Meteor.userId(),
      stock: stock,
      amt: amt
    });
  },
  'userStocks.sell' (stock, amt) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    UserStocks.insert({
      ownerID: Meteor.userId(),
      stock: stock,
      amt: amt
    });
  },
});