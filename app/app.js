angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
    '720kb.datepicker',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/event/create', {
        templateUrl: 'events/create.html',
        controller: createEvent
    });

    $routeProvider.when('/event/createWithDate/:date', {
        templateUrl: 'events/create.html',
        controller: createEvent
    });

    $routeProvider.when('/event/createWithPerson/:id', {
        templateUrl: 'events/create.html',
        controller: createEvent
    });

    $routeProvider.when('/event/persons-plan/:id', {
        templateUrl: 'events/persons-plan.html',
        controller: personsPlan
    });

    $routeProvider.when('/event/persons-plan/:id/:success', {
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

    $routeProvider.when('/event/edit/:id', {
        templateUrl: 'events/edit-event.html',
        controller: editEvent
    });

    $routeProvider.when('/event/delete/:id', {
        templateUrl: 'events/delete.html',
        controller: deleteEvent
    });

    $routeProvider.otherwise({
        templateUrl: 'events/main.html',
        controller: mainPage
    });

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

    .filter('europeanTimeFilter', function () {
        return function (item) {
            var dateObj = new Date(item);
            var month = dateObj.getMonth() + 1;
            var day = dateObj.getDate();
            var year = dateObj.getFullYear();
            return day + '/' + month + '/' + year;
        };
    })

    .directive('back', ['$window', function ($window) {
        return {
            link: function (scope, elem) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }])

    .component('showEvent', {
        templateUrl: 'events/components/showEvent.html',
        controller: function ($http) {
            this.$onInit = function () {
                this.personDetails = null;
                const that = this;

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/students/' + this.person,
                }).then(function successCallback(response) {
                    that.personDetails = response.data.firstName + ' ' + response.data.lastName;
                }, function errorCallback(response) {
                });
            };
        },
        bindings: {
            id: '<',
            title: '<',
            category: '<',
            date: '<',
            period: '<',
            person: '<'
        }
    })

    .component('showEventMinimal', {
        templateUrl: 'events/components/showEventMinimal.html',
        controller: function ($http) {
            this.$onInit = function () {
                this.personDetails = null;
                this.color = null;

                if (this.category == 1) {
                    this.color = 'bg-danger';
                }
                if (this.category == 2) {
                    this.color = 'bg-success';
                }
                if (this.category == 3) {
                    this.color = 'bg-warning';
                }

                const that = this;

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/students/' + this.person,
                }).then(function successCallback(response) {
                    that.personDetails = response.data.firstName + ' ' + response.data.lastName;
                }, function errorCallback(response) {
                });
            };
        },
        bindings: {
            id: '<',
            title: '<',
            category: '<',
            date: '<',
            period: '<',
            person: '<'
        }
    })


    .component('categoryBar', {
        templateUrl: 'events/components/categoryBar.html',
        controller: function () {
            this.$onInit = function () {
                this.color = null;
                this.title = null;

                if (this.category == 1) {
                    this.color = 'bg-danger';
                    this.title = 'Zakupy';
                }
                if (this.category == 2) {
                    this.color = 'bg-success';
                    this.title = 'Nauka';
                }
                if (this.category == 3) {
                    this.color = 'bg-warning';
                    this.title = 'Odpoczynek';
                }
            };
        },
        bindings: {
            category: '<'
        }
    })

    .component('categorySelector', {
        templateUrl: 'events/components/categorySelector.html',
        controller: function () {
            this.$onInit = function () {
                this.category = null;
                this.categories = [
                    {id: 1, title: 'Zakupy'},
                    {id: 2, title: 'Nauka'},
                    {id: 3, title: 'Odpoczynek'}
                ];

                this.setCategory = function () {
                    this.onUpdate({id: this.category});
                };
            };
        },
        bindings: {
            selected: '<',
            onUpdate: '&'
        }
    })

    .component('eventsNavigation', {
        templateUrl: 'events/components/eventsNavigation.html',
        controller: function () {
            this.$onInit = function () {
                this.filterPhrase = null;
                this.sortKey = null;

                this.setSort = function (key) {
                    this.sortKey = key;
                    this.onUpdateSort({key: this.sortKey});
                };

                this.setFilter = function () {
                    this.onUpdateFilter({key: this.filterPhrase});
                };
            };
        },
        bindings: {
            onUpdateSort: '&',
            onUpdateFilter: '&'
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
                    {id: 11, title: 'Grudzień'}
                ];

                this.setMonth = function () {
                    this.onUpdate(
                        {id: this.month});
                };
            };
        },
        bindings: {
            onUpdate: '&'
        }
    });

function createEvent($scope, $http, $location, $routeParams) {
    this.title = '';
    this.category = 0;
    this.date = '';
    this.person = 0;
    this.period = 0;

    if ($routeParams.id !== null) {
        $scope.person = $routeParams.id;
    }
    if ($routeParams.date !== null) {
        $scope.date = $routeParams.date
    }

    $scope.periods = [
        {id: 1, startHour: 8, endHour: 10},
        {id: 2, startHour: 10, endHour: 12},
        {id: 3, startHour: 12, endHour: 14},
        {id: 4, startHour: 14, endHour: 16},
        {id: 5, startHour: 16, endHour: 18},
        {id: 6, startHour: 18, endHour: 20},
        {id: 7, startHour: 20, endHour: 22},
        {id: 8, startHour: 22, endHour: 24}
    ];

    $http({
        method: 'GET',
        url: 'http://localhost:3000/students'
    }).then(function successCallback(response) {
        var people = response.data;
        $scope.people = people;
    }, function errorCallback(response) {
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
            // redirect to the list of person's events
            $location.path('/event/persons-plan/' + $scope.person + '/1');
        }, function errorCallback(response) {
        });
    };

    $scope.setCategory = function (id) {
        $scope.category = id;
    };
};


function personsPlan($scope, $http, $routeParams, $location) {
    $scope.person = null;
    $scope.noRecords = false;
    $scope.success = false;

    if ($routeParams.success === '1') {
        $scope.success = 1; // succesfully created
    };
    if ($routeParams.success === '2') {
        $scope.success = 2; // succesfully edited
    };

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
            $scope.personsId = $routeParams.id;
        }, function errorCallback(response) {
        });
    }, function errorCallback(response) {
        $scope.noRecords = true;
        $scope.personsId = $routeParams.id;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/students/' + $routeParams.id,
        }).then(function successCallback(response) {
            $scope.person = response.data.firstName + ' ' + response.data.lastName;
        }, function errorCallback(response) {
        });
    });

    $scope.filterPhrase = '';
    $scope.orderByPhrase = 'id';
    $scope.setSort = function (key) {
        $scope.orderByPhrase = key;
    };

    $scope.setFilter = function (key) {
        $scope.filterPhrase = key;
    };
};


function dayPlan($scope, $http, $routeParams, $location) {
    $scope.date = null;
    $scope.noRecords = false;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/dayPlan/' + $routeParams.date
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.events = events;
        $scope.date = events[0].date;
    }, function errorCallback(response) {
        $scope.noRecords = true;
        $scope.date = $routeParams.date;
    });

    $scope.filterPhrase = '';
    $scope.orderByPhrase = 'id';
    $scope.setSort = function (key) {
        $scope.orderByPhrase = key;
    };

    $scope.setFilter = function (key) {
        $scope.filterPhrase = key;
    };
};

function monthlyPlan($scope, $http, $routeParams, $location) {
    $scope.date = null;
    $scope.noRecords = false;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/monthlyPlan/' + $routeParams.month
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.events = events;
        $scope.date = events[0].date;
    }, function errorCallback(response) {
        $scope.noRecords = true;
    });

    $scope.filterPhrase = '';
    $scope.orderByPhrase = 'id';
    $scope.setSort = function (key) {
        $scope.orderByPhrase = key;
    };

    $scope.setFilter = function (key) {
        $scope.filterPhrase = key;
    };
};

function mainPage($scope, $http, $routeParams, $location) {
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
    });

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events'
    }).then(function successCallback(response) {
        var events = response.data;
        $scope.datesWithEvents = [];
        events.forEach(function (event) {
            $scope.datesWithEvents.push(event.date);
        });
    }, function errorCallback(response) {
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

    $scope.clearChoice = function () {
        $scope.mode = null;
    };
};

function editEvent($scope, $http, $routeParams, $location) {
    $scope.id = $routeParams.id;
    $scope.title = null;
    $scope.category = null;
    $scope.date = null;
    $scope.selectedPeriod = null;
    $scope.period = null;
    $scope.person = null;

    $scope.periods = [
        {id: 1, startHour: 8, endHour: 10},
        {id: 2, startHour: 10, endHour: 12},
        {id: 3, startHour: 12, endHour: 14},
        {id: 4, startHour: 14, endHour: 16},
        {id: 5, startHour: 16, endHour: 18},
        {id: 6, startHour: 18, endHour: 20},
        {id: 7, startHour: 20, endHour: 22},
        {id: 8, startHour: 22, endHour: 24}
    ];

    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/' + $scope.id,
    }).then(function successCallback(response) {
        $scope.title = response.data.title;
        $scope.category = response.data.category;
        $scope.date = response.data.date;
        $scope.period = response.data.period;
        $scope.selectedPeriod = response.data.period;
        $scope.person = response.data.person;
    }, function errorCallback(response) {
    });

    $http({
        method: 'GET',
        url: 'http://localhost:3000/students'
    }).then(function successCallback(response) {
        var people = response.data;
        $scope.people = people;
    }, function errorCallback(response) {
    });

    $scope.editEvent = function () {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/events/' + $scope.id,
            data: {
                'title': $scope.title,
                'category': $scope.category,
                'date': $scope.date,
                'period': $scope.period
            }
        }).then(function successCallback(response) {
            // redirect to the list of person's events
            $location.path('/event/persons-plan/' + $scope.person + '/2');
        }, function errorCallback(response) {
        });
    };

    $scope.setCategory = function (id) {
        $scope.category = id;
    };
};

function deleteEvent($scope, $http, $routeParams, $location) {
    $http({
        method: 'GET',
        url: 'http://localhost:3000/events/' + $routeParams.id
    }).then(function successCallback(response) {
        $scope.title = response.data.title;
        $scope.date = response.data.date;
    }, function errorCallback(response) {
    });

    $scope.eventDelete = function () {
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/events/' + $routeParams.id
        }).then(function successCallback(response) {
            $location.path('/');
        }, function errorCallback(response) {
        });
    };
};