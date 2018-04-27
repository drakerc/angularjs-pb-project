'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.showAge = true;

    $scope.firstName = '';
    $scope.lastName = '';
    $scope.age = 0;

    $scope.filterPhrase = '';
    $scope.orderByPhrase = 'imie'; //domyslnie jako od imienia

    $scope.studenci = [
        {'imie': 'Ala',
            'nazwisko': 'Makota',
            'wiek': 23,
            'oceny': [1, 2, 3, 4, 5]
        },
        {
            'imie': 'Zosia',
            'nazwisko': 'Samosia',
            'wiek': 20,
            'oceny': [1, 2, 5]
        }
    ];
    //
    //
    // $filter('ageFilter', function () {
    //     return function (item) {
    //         if (item === 2 || item === 3 || item === 4)
    //             return item + ' lata';
    //         return item + ' lat';
    //     };
    // });

    $scope.triggerShowAge = function () {
        $scope.showAge = !$scope.showAge;
    };

    $scope.sortAge = function () {
        $scope.orderByPhrase = 'wiek';
    }

    $scope.sortLastName = function () {
        $scope.orderByPhrase = 'nazwisko';
    }

    $scope.addStudent = function () {

        if (typeof $scope.firstName !== 'string' || typeof $scope.lastName !== 'string' ||
            typeof $scope.age !== 'number' || $scope.firstName === '' || $scope.lastName === '' || $scope.age === '' ){
            alert('Wprowadziles nieprawidlowe dane');
            return false;
        }

        if ($scope.age >= 36 || $scope.age <= 18) {
            alert('Wprowadziles nieprawidlowy wiek (nie jest w zakresie 19-35');
            return false;
        }

        $scope.studenci.push({
            'imie': $scope.firstName,
            'nazwisko': $scope.lastName,
            'wiek': $scope.age,
        })
    };

    $scope.average = function (marks) {
      var sum = 0;
      var i;
      for (i=0; i<marks.length; i++)  {
        sum += marks[i];
      }
      return (sum / marks.length).toFixed(2);
    };
}]);