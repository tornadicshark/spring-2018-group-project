import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './currencyInfo.html';

import { Meteor } from 'meteor/meteor';

class CurrencyCtrl {
    constructor($scope) {
        $scope.viewModel(this);
    
        // Return the data mostly right now
        this.helpers({
          currentUser() {
            return Meteor.user();
          }
        })
    }
/*
  buyStock(name, value, owner) {
    console.log("buy stock button clicked");
    console.log(name + ", " + value + ", " + owner);
  }

  sellStock(name, value, owner) {
    console.log("sell stock button clicked");
    console.log(name + ", " + value + ", " + owner);
  }*/
  
}
 
export default angular.module('CurrencyApp', [
  angularMeteor
])
.component('currencyInfo', {
    templateUrl: 'imports/components/currencyInfo/currencyInfo.html',
    controller: ['$scope', CurrencyCtrl]
}).controller('numberSpinner', ['$scope', function($scope){
    var vm = this;
    
    vm.testNumber = 10;  
}])
.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
}).directive('numberSpin', [function(){  
    return {
        restrict: 'E',
        scope: {
            "ngModel": '='
        },
        template: '<div>' +
        '<input numeric-only data-ng-model="ngModel" ng-pattern="onlyNumbers" type="text">'+
        '<a class="ns-plus"  data-ng-click="plus()">+</a>' +
        '<a class="ns-minus"data-ng-click="minus()">-</a> </div>',
        link: function(scope, elem, attrs){
        
            scope.onlyNumbers = /^\d+$/;
        
            scope.plus = function(){
                scope.ngModel = scope.ngModel + 1;
            }
            
            scope.minus = function(){
                scope.ngModel = scope.ngModel - 1;
            }
        
        
        }
    }
}]);