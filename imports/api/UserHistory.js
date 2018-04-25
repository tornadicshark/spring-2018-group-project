/** 
 * UserHistory Collection:
 * 
 * owner            the username of the person who bought the stock
 * transactionType  bought or sold
 * stockType        name of the stock
 * amt              the amount of shares bought
 * value            the price of one share when bought/sold
 * date             the date of the transaction
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserHistory = new Mongo.Collection('userHistory');