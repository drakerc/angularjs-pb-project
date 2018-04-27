'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    '720kb.datepicker',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

    $routeProvider.when('/ps5/create', {
        templateUrl: 'studentEdit/studentEdit.html',
        controller: addStudent
    });

    $routeProvider.when('/ps5/edit/:id', {
        templateUrl: 'studentEdit/studentEditor.html',
        controller: editStudent
    });

    $routeProvider.when('/ps5/list', {
        templateUrl: 'studenci/studenci.html',
        controller: listStudents
    });

    $routeProvider.when('/ps5/delete/:id', {
        templateUrl: 'studentDelete/studentDelete.html',
        controller: deleteStudent
    });


    $routeProvider.when('/event/create', {
        templateUrl: 'events/create.html',
        controller: createEvent
    });

    $routeProvider.when('/event/persons-plan/:id', {
        templateUrl: 'events/persons-plan.html',
        controller: personsPlan
    });




    // $routeProvider.when('/event/edit/:id', {
    //     templateUrl: 'events/edit.html',
    //     controller: editStudent
    // });
    //
    // $routeProvider.when('/event/list', {
    //     templateUrl: 'events/list.html',
    //     controller: listStudents
    // });
    //
    // $routeProvider.when('/event/delete/:id', {
    //     templateUrl: 'events/delete.html',
    //     controller: deleteStudent
    // });









  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.filter('ageFilter', function () {
return function (item) {
    if (item === 2 || item === 3 || item === 4)
        return item + ' lata';
    return item + ' lat';
};
})
// .component('student', {
//     templateUrl: 'student/student.html',
//     bindings: {
//         firstname: '<',
//         lastname: '<',
//         age: '<',
//         showage: '<'
//     }
// })
// .component('studentMarks', {
//     templateUrl: 'studentMarks/studentMarks.html',
//
//     controller: function () {
//         this.$onInit = function () {
//             var $scope = this;
//             $scope.average = function () {
//                 var sum = 0;
//                 var i;
//                 for (i=0; i<this.marks.length; i++)  {
//                     sum += this.marks[i];
//                 }
//                 return (sum / this.marks.length).toFixed(2);
//             };
//         }
//     },
//     bindings: {
//         marks: '<'
//     }
// })
// .component('studentDetails', {
//     templateUrl: 'student/studentDetails.html',
//
//     controller: function ($http) {
//         this.$onInit = function () {
//             var $scope = this;
//             this.firstName = '';
//             this.lastName = '';
//             this.age = 0;
//             this.marks = [];
//             this.gotcha = false;
//
//             $scope.getDetails = function (id) {
//                 $http({
//                     method: 'GET',
//                     url: 'http://localhost:3000/students/' + id,
//                 }).then(function successCallback(response) {
//                     $scope.firstName = response.data.firstName;
//                     $scope.lastName = response.data.lastName;
//                     $scope.age = response.data.age;
//                     $scope.marks = response.data.oceny;
//                     $scope.gotcha = true;
//
//                 }, function errorCallback(response) {
//                     console.log('fail')
//                 });
//             };
//         }
//     },
//     bindings: {
//         id: '<'
//     }
// })
// .component('studentDelete', {
//     templateUrl: 'studentDelete/studentDelete.html',
//
//     controller: function ($http) {
//         this.$onInit = function () {
//             var $scope = this;
//
//             $scope.studentDelete = function (id) {
//                 $http({
//                     method: 'DELETE',
//                     url: 'http://localhost:3000/students/' + id,
//                 }).then(function successCallback(response) {
//                     $scope.onUpdate({value: id});
//                 }, function errorCallback(response) {
//                     console.log('fail')
//                 });
//             };
//         }
//     },
//     bindings: {
//         onUpdate: '&',
//         id: '<'
//     }
// })





.component('categorySelector', {
    templateUrl: 'events/components/categorySelector.html',
    controller: function () {
        this.$onInit = function () {
            this.category = null;
            this.categories = [{id: 1, title: 'Zakupy'}, {id: 2, title: 'Nauka'}, {id: 3, title: 'Odpoczynek'}];

            this.setCategory = function () {
                this.onUpdate({id: this.category});
            };

        };
    },
    bindings: {
        onUpdate: '&',
}

});

function addStudent ($scope, $http) {
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
    this.student = {};

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

        $http({
            method: 'POST',
            url: 'http://localhost:3000/students',
            data: {'firstname': $scope.firstName, 'lastname': $scope.lastName, 'age': $scope.age}
        }).then(function successCallback(response) {
            $scope.student.imie = $scope.firstName;
            $scope.student.nazwisko = $scope.lastName;
            $scope.student.wiek = $scope.age;
            $location.path('/ps5/list');

        }, function errorCallback(response) {
            console.log('fail')
        });
    };
};

function editStudent ($scope, $http, $routeParams, $location) {
    $scope.id = $routeParams.id;
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.age = 0;
    $scope.marks = [];

    $http({
        method: 'GET',
        url: 'http://localhost:3000/students/' + $scope.id,
    }).then(function successCallback(response) {
        $scope.firstName = response.data.firstName;
        $scope.lastName = response.data.lastName;
        $scope.age = response.data.age;
        $scope.marks = response.data.oceny;

    }, function errorCallback(response) {
        console.log('fail')
    });

    $scope.editStudent = function () {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/students/' + $scope.id,
            data: {'firstName': $scope.firstName, 'lastName': $scope.lastName, 'age': $scope.age}
        }).then(function successCallback(response) {
            $location.path('/ps5/list');
        }, function errorCallback(response) {
            console.log('fail')
        });
    };
};

function listStudents ($scope, $http) {
    var self = this;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/students'
    }).then(function successCallback(response) {
        var studenci = response.data;
        $scope.studenci = studenci;
    }, function errorCallback(response) {
        console.log('fail')
    });

    this.showAge = true;
    this.filterPhrase = '';
    this.orderByPhrase = 'imie'; //domyslnie jako od imienia

    $scope.sortAge = function () {
        $scope.orderByPhrase = 'age';
    }

    $scope.sortLastName = function () {
        $scope.orderByPhrase = 'lastName';
    }

    $scope.triggerShowAge = function () {
        this.showAge = !this.showAge;
    };
};

function deleteStudent ($scope, $http, $routeParams, $location) {
    $scope.studentDelete = function () {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/students/' + $routeParams.id,
        }).then(function successCallback(response) {
            $location.path('/ps5/list');
        }, function errorCallback(response) {
            console.log('fail')
        });
    };
};


function createEvent ($scope, $http, $location) {
    this.title = '';
    this.category = 0;
    this.date = '';
    this.person = 0;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/students'
    }).then(function successCallback(response) {
        var people = response.data;
        $scope.people = people;
    }, function errorCallback(response) {
        console.log('fail')
    });

    $scope.add = function () {
        if (typeof $scope.title !== 'string' || typeof $scope.category !== 'string' ||
            typeof $scope.date !== 'string' || typeof $scope.person !== 'string' || $scope.title=== '' || $scope.category === '' || $scope.date === '' || $scope.person === '') {
                alert('Wprowadziles nieprawidlowe dane');
                return false;
        }

        $http({
            method: 'POST',
            url: 'http://localhost:3000/events',
            data: {'title': $scope.title, 'category': $scope.category, 'date': $scope.date, 'person': $scope.person}
        }).then(function successCallback(response) {
            // $scope.event.imie = $scope.firstName;
            // $scope.event.nazwisko = $scope.lastName;
            // $scope.event.wiek = $scope.age;
            $location.path('/event/list');

        }, function errorCallback(response) {
            console.log('fail');
        });
    };

    $scope.setCategory = function (id) {
        $scope.category = id;
    };
};


function personsPlan ($scope, $http, $routeParams, $location) {
    var self = this;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/personsPlan/' + $routeParams.id
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.events = events;
    }, function errorCallback(response) {
        console.log('fail');
    });

    // this.showAge = true;
    // this.filterPhrase = '';
    // this.orderByPhrase = 'imie'; //domyslnie jako od imienia
    //
    // $scope.sortAge = function () {
    //     $scope.orderByPhrase = 'age';
    // }
    //
    // $scope.sortLastName = function () {
    //     $scope.orderByPhrase = 'lastName';
    // }
    //
    // $scope.triggerShowAge = function () {
    //     this.showAge = !this.showAge;
    // };
};
