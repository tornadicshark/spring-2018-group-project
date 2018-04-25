import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './buyForm.html';
 
class BuyCtrl {
  constructor($scope) {
    
  }
}
 
export default angular.module('BuyModal', [
  angularMeteor
])
  .component('buyModal', {
    templateUrl: 'imports/components/buyForm/buyForm.html',
    controller: ['$scope', BuyCtrl]
  });