'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
    '720kb.datepicker',
    // 'myApp.view1',
    'myApp.version',
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
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

    $routeProvider.when('/event/day-plan/:date', {
        templateUrl: 'events/day-plan.html',
        controller: dayPlan
    });

    $routeProvider.when('/event/monthly-plan/:month', {
        templateUrl: 'events/monthly-plan.html',
        controller: monthlyPlan
    });


    $routeProvider.otherwise({
        templateUrl: 'events/main.html',
        controller: mainPage
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

}])


    .filter('monthFilter', function () {
        return function (item) {
            var date = new Date(item);
            var month = date.getMonth();

            if (month == 0) {
                return 'Styczeń';
            }
            if (month == 1) {
                return 'Luty';
            }
            if (month == 2) {
                return 'Marzec';
            }
            if (month == 3) {
                return 'Kwiecień';
            }
            if (month == 4) {
                return 'Maj';
            }
            if (month == 5) {
                return 'Czerwiec';
            }
            if (month == 6) {
                return 'Lipiec';
            }
            if (month == 7) {
                return 'Sierpień';
            }
            if (month == 8) {
                return 'Wrzesień';
            }
            if (month == 9) {
                return 'Październik';
            }
            if (month == 10) {
                return 'Listopad';
            }
            if (month == 11) {
                return 'Grudzień';
            }
            // console.log(date)
            // console.log(date.getDate());
            // console.log(date.getDay());
            // console.log(date.getMonth());
            // console.log(date.getFullYear());
        };
    })

    .filter('dayOfWeekFilter', function () {
        return function (item) {
            var date = new Date(item);
            var day = date.getDay();

            if (day == 0) {
                return 'Niedziela';
            }
            if (day == 1) {
                return 'Poniedziałek';
            }
            if (day == 2) {
                return 'Wtorek';
            }
            if (day == 3) {
                return 'Środa';
            }
            if (day == 4) {
                return 'Czwartek';
            }
            if (day == 5) {
                return 'Piątek';
            }
            if (day == 6) {
                return 'Sobota';
            }
        };
    })

    .filter('periodFilter', function () {
        return function (item) {
            //Periods: 1: 8-10 2: 10-12, 3: 12-14, 4: 14-16, 5: 16-18, 6: 18-20, 7: 20-22, 8: 22-24

            if (item == 1) {
                return '8-10';
            }
            if (item == 2) {
                return '10-12';
            }
            if (item == 3) {
                return '12-14';
            }
            if (item == 4) {
                return '14-16';
            }
            if (item == 5) {
                return '16-18';
            }
            if (item == 6) {
                return '18-20';
            }
            if (item == 7) {
                return '20-22';
            }
            if (item == 8) {
                return '22-24';
            }
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

    .component('showEvent', {
        templateUrl: 'events/components/showEvent.html',

        controller: function () {
            this.$onInit = function () {
            }
        },
        bindings: {
            id: '<',
            title: '<',
            category: '<',
            date: '<',
            period: '<',
            person: '<',
        }
    })

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
    })

    .component('monthSelector', {
        templateUrl: 'events/components/monthSelector.html',
        controller: function () {
            this.$onInit = function () {
                this.month = null;
                this.months = [
                    {id: 0, title: 'Styczeń'},
                    {id: 1, title: 'Luty'},
                    {id: 2, title: 'Marzec'},
                    {id: 3, title: 'Kwiecień'},
                    {id: 4, title: 'Maj'},
                    {id: 5, title: 'Czerwiec'},
                    {id: 6, title: 'Lipiec'},
                    {id: 7, title: 'Sierpień'},
                    {id: 8, title: 'Wrzesień'},
                    {id: 9, title: 'Październik'},
                    {id: 10, title: 'Listopad'},
                    {id: 11, title: 'Grudzień'},
                ];

                this.setMonth = function () {
                    this.onUpdate(
                        {id: this.month});
                };
            };
        },
        bindings: {
            onUpdate: '&',
        }

    });


function addStudent($scope, $http) {
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
    this.student = {};

    $scope.addStudent = function () {
        if (typeof $scope.firstName !== 'string' || typeof $scope.lastName !== 'string' ||
            typeof $scope.age !== 'number' || $scope.firstName === '' || $scope.lastName === '' || $scope.age === '') {
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

function editStudent($scope, $http, $routeParams, $location) {
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

function listStudents($scope, $http) {
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

function deleteStudent($scope, $http, $routeParams, $location) {
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


function createEvent($scope, $http, $location) {
    this.title = '';
    this.category = 0;
    this.date = '';
    this.person = 0;
    this.period = 0;

    //Periods: 1: 8-10 2: 10-12, 3: 12-14, 4: 14-16, 5: 16-18, 6: 18-20, 7: 20-22, 8: 22-24
    $scope.periods = [
        {id: 1, startHour: 8, endHour: 10},
        {id: 2, startHour: 10, endHour: 12},
        {id: 3, startHour: 12, endHour: 14},
        {id: 4, startHour: 14, endHour: 16},
        {id: 5, startHour: 16, endHour: 18},
        {id: 6, startHour: 18, endHour: 20},
        {id: 7, startHour: 20, endHour: 22},
        {id: 8, startHour: 22, endHour: 24},
    ]

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
            typeof $scope.date !== 'string' || typeof $scope.person !== 'string' || typeof $scope.period !== 'string' || $scope.title === '' || $scope.category === '' || $scope.date === '' || $scope.person === '') {
            alert('Wprowadziles nieprawidlowe dane');
            return false;
        }

        $http({
            method: 'POST',
            url: 'http://localhost:3000/events',
            data: {
                'title': $scope.title,
                'category': $scope.category,
                'date': $scope.date,
                'person': $scope.person,
                'period': $scope.period
            }
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


function personsPlan($scope, $http, $routeParams, $location) {
    var self = this;
    $scope.person = null;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/personsPlan/' + $routeParams.id
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.events = events;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/students/' + events[0].person,
        }).then(function successCallback(response) {
            $scope.person = response.data.firstName + ' ' + response.data.lastName;
        }, function errorCallback(response) {
            console.log('fail')
        });
    }, function errorCallback(response) {
        console.log('fail');
    });





};


function dayPlan($scope, $http, $routeParams, $location) {
    var self = this;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/dayPlan/' + $routeParams.date
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.events = events;
    }, function errorCallback(response) {
        console.log('fail');
    });
};

function monthlyPlan($scope, $http, $routeParams, $location) {
    var self = this;
    $scope.date = null;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/monthlyPlan/' + $routeParams.month
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.events = events;
        $scope.date = events[0].date;
    }, function errorCallback(response) {
        console.log('fail');
    });
};

function mainPage($scope, $http, $routeParams, $location) {
    var self = this;
    $scope.mode = null;
    this.date = null;
    this.month = null;
    this.person = null;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/students'
    }).then(function successCallback(response) {
        var people = response.data;
        $scope.people = people;
    }, function errorCallback(response) {
        console.log('fail');
    });

    $scope.setMode = function (mode) {
        $scope.mode = mode;
    };

    $scope.setMonth = function (id) {
        $scope.month = id;
    };

    $scope.goToSelectedMode = function (mode) {
        if (mode === 'day') {
            $location.path('/event/day-plan/' + this.date);
        }
        if (mode === 'month') {
            $location.path('/event/monthly-plan/' + this.month);
        }
        if (mode === 'person') {
            $location.path('/event/persons-plan/' + this.person);
        }
    };
};
