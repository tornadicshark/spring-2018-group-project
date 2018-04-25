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