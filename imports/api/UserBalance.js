/** 
 * User Collection:
 * 
 * ownerID      userID
 * balance      account balance for user
 * 
 * Users get $25,000 free when they sign up.
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserBalance = new Mongo.Collection('userBalance');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('userBalance', function getBalance() {
      return UserBalance.find({
        ownerID: this.userId
      })
    });
}

Meteor.methods({
    'userBalance.init' () {
        // Make sure the user is logged in before adding
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        
        var count = UserBalance.find({
            ownerID: Meteor.userId()
        }).count();

        if (count == 0) {
            UserBalance.insert(
                {
                    ownerID: Meteor.userId(), 
                    balance: 25000
            });
            return "User balance set to $25,000";
        } else {
            return "User already initalized";
        }
    },
    'userBalance.change' (balance, stockPrice, amt, type) {
        // Make sure the user is logged in before adding
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        // check the type 

        // if type is Sell (selling stock)
        if (type === "Sell") {
            // update and increase
            var response = UserBalance.update(
                { ownerID: { $eq: this.userId } },
                { $setOnInsert: { ownerID: this.userId}, $inc: {balance: Number(stockPrice*amt)} }
            );
            return response;  
        } 
        // if type is Buy (buying stock)
        else if (type === "Buy") {

            // calculate new account balance
            var newBalance = Number(balance) - Number(amt*stockPrice);

            // is the amount higher than the current balance? 
            if ( newBalance < 0) {
                // return error message, do not let user buy stock
                throw new Meteor.Error("ERROR: Insufficent funds to complete transaction");
            } else {
            // update and decrease
            var response = UserBalance.update(
                { ownerID: { $eq: this.userId } },
                { $setOnInsert: { ownerID: this.userId}, $set: {balance: newBalance} }
            );
            return response;
            }  
        } else {
            return "Did not process correctly";
        }
    }
});