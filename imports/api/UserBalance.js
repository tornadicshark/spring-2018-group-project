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
    'userBalance.change' (balance, stockPrice, amt, username, type) {
        // Make sure the user is logged in before adding
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        
        // check the type 

        // if type is add (selling stock)
            // update and increase

        // if type is subtract (buying stock)
            // is the amount higher than the current balance? 
                // return error message, do not let user buy stock
                
            // calculate new account balance
              // update and decrease

               
        var response = UserBalance.update(
            { ownerID: { $eq: this.userId } },
            { $setOnInsert: { ownerID: this.userId}, $set: {balance: balance} },
            { upsert: true, returnNewDocument: true}
          );

          return response;  
    }
});