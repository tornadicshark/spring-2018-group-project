import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';

// added for functionality
import { Meteor } from 'meteor/meteor';
import { UserStocks } from '../../api/UserStocks.js';
import { Stocks } from '../../api/Stocks.js';
import { UserHistory } from '../../api/UserHistory.js';
 
class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('stocks');
    this.subscribe('userStocks');
    this.subscribe('userHistory');

    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        return Stocks.find({});
      },
      userStocks() {
        return UserStocks.find({});
      },
      userHistory() {
        return UserHistory.find({});
      }
    })
  }

  sellStock(stock, amt) {
    console.log("Selling stock processing...");
    // add to the user's stock
    Meteor.call('userStocks.sell', stock, amt);

    // add to the history
    const type = "Sell";
    const price = getPrice(stock);
    const date = new Date();
    Meteor.call('userHistory.add', stock, amt, price, date, type);
  }
}
 
export default angular.module('DashboardApp', [
  angularMeteor
])
  .component('dashApp', {
    templateUrl: 'imports/components/dashboard/dashboard.html',
    controller: ['$scope', DashboardCtrl]
  });


  function getPrice(stockName) {
    stock = Stocks.findOne({
      name: { $eq: stockName }
    });

    return stock.close;
  }