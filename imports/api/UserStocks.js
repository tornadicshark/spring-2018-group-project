import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

UserStocks = new Mongo.Collection('userStocks');

UserStocks.schema = new SimpleSchema({
    owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false},
    name: {type: String, optional: false},
    amt: {type: Number, defaultValue: 0, optional: false},
    value: {type: Number, defaultValue: 0, optional: false},
    date: {type: Date, optional: false},
  });

UserStocks.attachSchema(UserStocks.schema);

export const UserStocks;

/*
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('userStocks', function userStocksPublication() {
    return UserStocks;
  });
}
 
Meteor.methods({
  // old sell method
  'userStocks.buy' (name, amt, value, userId) {

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    userStocks.insert({
      owner: Meteor.userId(),
      name: name,
      amt: amt,
      value: value,
      date: new Date()
    });
  },
  // old remove method
  'userStocks.sell' (taskId) {
    check(taskId, String);
	  
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    } 
	
	  if (task.owner !== Meteor.userId()){
      // If the task is not the user's they cannot delete it
      throw new Meteor.Error('not-authorized');
    } 
	  
	  if (task.priority) {
		  alert("Please remove priority from this task before trying to delete");
      throw new Meteor.Error('prioritzed-task');
	  }
	  
	 Tasks.remove(taskId);
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