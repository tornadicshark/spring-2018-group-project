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
        ownerID: { $eq: this.userId }
      });
  });
}

Meteor.methods({
  'userStocks.buy' (stock, amount) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    // if currently exists, increase the amount by the amount purchased
    // if it does not exit, the upsert true will create/insert
    const newID = UserStocks.update(
      { ownerID: { $eq: this.userId }, stock: { $eq: stock } },
      { $setOnInsert: { ownerID: this.userId, stock: stock}, $inc: {amt: amount} },
      { upsert: true, returnNewDocument: true}
    );

    return newID;
  },
  'userStocks.sell' (stock, amount) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var currentStock = UserStocks.findOne({
      ownerID: { $eq: this.userId },
      stock: { $eq: stock }
    });

    var oldAmount = Number(currentStock.amt);
    
    var newAmount = (Number(oldAmount) - Number(amount));

    try {
    if (newAmount > 0) {
        UserStocks.update(
          { ownerID: { $eq: this.userId }, stock: { $eq: stock } },
          { $setOnInsert: { ownerID: this.userId, stock: stock}, $set: {amt: newAmount} },
          { upsert: true, returnNewDocument: true},
        );
        return "Success";
      } else if (newAmount >= 0) {
        UserStocks.remove(
          { ownerID: { $eq: this.userId }, stock: { $eq: stock } }
        );
        return "Success";
      } else {
        return "Error. Could not sell your stock. Make sure you are not selling more than you actual own.";
      }
    } catch (Exception) {
      throw new Meteor.Error('unsuccessful');
    }
  },
});