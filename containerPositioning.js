'use strict'

var app = angular.module('scrollableContainer', ['as.sortable']);

app.controller('MainCtrl', function ($scope) {


    $scope.sortableOptions1 = {
        containment: '#sortable-container1'
    };

    $scope.sortableOptions2 = {
        containment: '#sortable-container2',
        containerPositioning: 'relative'
    };
});