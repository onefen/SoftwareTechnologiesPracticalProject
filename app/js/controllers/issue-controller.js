'use strict';

issueTrackerSystem.controller('IssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notificationService',
    'authorizationService',
    'PAGE_SIZE',
    function($scope, $location, $routeParams, issueService, notificationService, authorizationService, PAGE_SIZE) {

        $scope.isAdmin = authorizationService.isAdmin();

        $scope.getAllIssues = function(params) {
            let skippedItems = (params.pageNumber - 1) * PAGE_SIZE;

            issueService.getAllIssues(skippedItems, PAGE_SIZE)
                .then(function(resolve) {
                    //notificationService.showInfo('Issues are taken successful');
                    $scope.issuesPreview = true;
                    $scope.allIssues = resolve.data;
                }, function(error) {
                    notificationService.showError('Request failed' + error.statusText);
                })
        };

        $scope.issueRequestParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        $scope.reloadIssues = function() {
            $scope.getAllIssues($scope.issueRequestParams);
        };

        $scope.getAllIssues($scope.issueRequestParams);
    }
]);