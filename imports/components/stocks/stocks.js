import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';

import ngAnimate from 'angular-animate';

import { Meteor } from 'meteor/meteor';
import { Stocks } from '../../api/Stocks.js';
import { UserStocks } from '../../api/UserStocks.js';
import { UserHistory } from '../../api/UserHistory.js';
import { UserBalance } from '../../api/UserBalance.js';
import { isNull } from 'util';

class StocksCtrl {

  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('stocks');
    this.subscribe('userHistory');
    this.subscribe('userStocks');
    this.subscribe('userBalance');

    // Return the data mostly right now
    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        const selector = {};
        // Show newest tasks at the top
        return Stocks.find(selector, {
          sort: {
            name: 1
          }
        });
      },
      userStocks() {
        return UserStocks.find({});
      },
      userHistory() {
        return UserHistory.find({});
      },
      userBalance() {
        return UserBalance.findOne({});
      }
    })
  }


  // INITALIZE USER BALANCE IF NOT ALREADY DONE
  init() {
    Meteor.call('userBalance.init', function(error, result) {
      if(error){
        console.log(error.reason);
        return;
      } 
      console.log(result);
    });
  }

  buyStock(stock, amt, price, date, balance) {
    console.log("Buying stock processing...");
    const type = "Buy";

    console.log("updating account balance...");
    // UPDATE UserBalance
    Meteor.call('userBalance.change', balance, price, amt, type, function(error, result){
      if (error) { 
        console.log(error.message); 
        alert(error.message);
        return; 
      } 
      
      if (result==1) {
        // log to console the new balance
        console.log(result);
        //alert(result);

        // ADD TO UserStock
        Meteor.call('userStocks.buy', stock, amt, function(error, result) {
          if(error){
            console.log(error.reason);
            return;
          } 
          // log to console
          console.log("UserID: " + Meteor.userId() + "\n Username: " + Meteor.user().username 
            + "\n Message: Purchase of " + amt + " shares of " + stock + " was successful.");

          // alert the user
          alert("Purchase of " + amt + " shares of " + stock + " was successful.");
        });

        // ADD TO UserHistory
        Meteor.call('userHistory.add', stock, amt, price, date, type, function(error, result) {
          if(error){
            console.log(error.reason);
            alert("Something went wrong with adding this purchase to your history. Please contact our support.");
            return;
          } 
          console.log("UserID: " + Meteor.userId() + "\n Username: " +Meteor.user().username
          + "\n Message: purchase of " + amt + " shares of " + stock + " added to history.");
        });

      }

    });
    console.log("Buying stock complete.");
  }

}
 
export default angular.module('StocksApp', [
  angularMeteor,
  ngAnimate
])
.component('stocksApp', {
  templateUrl: 'imports/components/stocks/stocks.html',
  controller: ['$scope', StocksCtrl]
});