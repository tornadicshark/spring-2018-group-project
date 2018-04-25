import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
/*
UserStocks = new Mongo.Collection('userStocks');

UserStocks.schema = new SimpleSchema({
    owner: {type: String, optional: false},
    name: {type: String, optional: false},
    amt: {type: String, defaultValue: 0, optional: false},
    value: {type: String, defaultValue: 0, optional: false},
    date: {type: Date, optional: false},
  });

UserStocks.attachSchema(UserStocks.schema);
*/
export const UserStocks = new Mongo.Collection('userStocks');

/*
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('userStocks', function userStocksPublication() {
    return UserStocks.find({
      owner: this.userId
    });
  });
}
 
Meteor.methods({
  // old add method
  'userStocks.buy' (name, value) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    UserStocks.insert({
      owner: Meteor.userId(),
      name: name,
      amt: '1',
      value: value,
      date: new Date()
    });
  },
  // old remove method
  'userStocks.sell' (stock, value) {
	  
    const userStock = UserStocks.findOne(stock);

	  if (stock.owner !== Meteor.userId()){
      // If the task is not the user's they cannot delete it
      throw new Meteor.Error('not-authorized');
    } 
	 UserStocks.remove(stock);
  },
  // could be used for buy more 
  /*
  'tasks.setPriority' (taskId, setAsPriority) {
    check(taskId, String);
    check(setAsPriority, Boolean);
 
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task as a priority
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, {
      $set: {
        priority: setAsPriority
      }
    });
  },
});*/