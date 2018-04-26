/** 
 * UserHistory Collection:
 * 
 * ownerID            the username of the person who bought the stock
 * transactionType  bought or sold
 * stockType        name of the stock
 * amt              the amount of shares bought
 * value            the price of one share when bought/sold
 * date             the date of the transaction
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserHistory = new Mongo.Collection('userHistory');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('userHistory', function getUserHistory() {
      return UserHistory.find({
          ownerID: this.userId
        });
    });
}

Meteor.methods({
    'userHistory.add' (stock, amt, price, date, type) {
        // Make sure the user is logged in before adding
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        
        try {
            var newListing = UserHistory.insert({
                ownerID: Meteor.userId(),
                transactionType: type,
                stockType: stock,
                amt: amt,
                value: price,
                date: new Date()
            });
            return newListing;
        } catch (Exception) {
            throw new Meteor.Error('uncategorized');
            return "Error";
        }
    }
});