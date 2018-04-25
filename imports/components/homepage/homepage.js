import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './homepage.html';


// for specific currency support
import currencyInfo from '../currencyInfo/currencyInfo';

class HomeCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    // Return the data mostly right now
    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        return [{
          name: 'Bitcoin',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin1',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin2',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin3',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin5',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin6',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin7',
          date: 'May 1, 2018',
          value: '422.50'
        }];
      }
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