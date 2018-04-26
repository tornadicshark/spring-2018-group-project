import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';

import ngAnimate from 'angular-animate';

import { Meteor } from 'meteor/meteor';
import { Stocks } from '../../api/Stocks.js';
import { UserStocks } from '../../api/UserStocks.js';
import { UserHistory } from '../../api/UserHistory.js';

class StocksCtrl {

  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('stocks');
    this.subscribe('userHistory');
    this.subscribe('userStocks');

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
    })
  }

  buyStock(stock, amt, price, date) {
    console.log("Buying stock processing...");
    // add to the user's stock
    Meteor.call('userStocks.buy', stock, amt);
    // add to the history
    const type = "Buy";
    Meteor.call('userHistory.add', stock, amt, price, date, type);
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