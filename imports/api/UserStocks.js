import { Mongo } from 'meteor/mongo';

UserStocks = new Mongo.Collection('userStocks');

UserStocks.schema = new SimpleSchema({
    name: {type: String},
    amt: {type: Number, defaultValue: 0},
    value: {type: Number, defaultValue: 0},
    userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });

UserStocks.attachSchema(UserStocks.schema);