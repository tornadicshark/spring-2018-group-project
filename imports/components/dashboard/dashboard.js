import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';

// added for functionality
import { Meteor } from 'meteor/meteor';
import { UserStocks } from '../../api/UserStocks.js';
import { Stocks } from '../../api/Stocks.js';
import { UserHistory } from '../../api/UserHistory.js';
import { UserBalance } from '../../api/UserBalance.js';
 
class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('stocks');
    this.subscribe('userStocks');
    this.subscribe('userHistory');
    this.subscribe('userBalance');

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

  // SELL STOCK
  sellStock(stock, amt, balance) {
    console.log("Selling stock processing...");

    var type = "Sell";
    var price = getPrice(stock);
    var date = new Date();

    // UPDATE UserBalance
    console.log("updating account balance...");
    Meteor.call('userBalance.change', balance, price, amt, type, function(error, result){
      if (error) { 
        console.log(error.message); 
        alert(error.message);
        return; 
      }
      // log to console the new balance
      console.log(result);
      //alert(result);
    });

    // add to the user's stock
    Meteor.call('userStocks.sell', stock, amt,function(error, result) {
      if(error){
        console.log("UserID: " + Meteor.userId() + "\n Username: " 
          + Meteor.user().username + "\n Message: " + error.reason);
        alert("Something went wrong. Make sure that you are not attempting to sell more shares than you own...");
        return;
      } 
      console.log("UserID: " + Meteor.userId() + "\n Username: " +Meteor.user().username + 
        "\n Message: Successfully sold " + amt + " shares of " + stock + ".");
      alert("Successfully sold " + amt + " shares of " + stock + ".");
    });

    // add to the history
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

    console.log("Stock price: " + stock.close);
    return Number(stock.close);
  }