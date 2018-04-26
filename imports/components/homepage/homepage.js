import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './homepage.html';


// for specific currency support
import currencyInfo from '../currencyInfo/currencyInfo';
import { Stocks } from '../../api/Stocks.js';
import { UserStocks } from '../../api/UserStocks.js';

class HomeCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('stocks');
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
        return UserStocks.find({
          ownerID: Meteor.userId/*,
          stock: stockName*/
        });
      }/*,
      // does not work
      getAmt(stockName) {
        return UserStocks.find({
          ownerID: Meteor.userId,
          stock: stockName
        });
      }*/
    })
  }

}
 
export default angular.module('HomeApp', [
  angularMeteor,
  currencyInfo.name
])
.component('homeApp', {
    templateUrl: 'imports/components/homepage/homepage.html',
    controller: ['$scope', HomeCtrl]
});