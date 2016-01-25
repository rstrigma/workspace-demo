/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


angular.module('demoApp').controller('NewCardController', ['$scope', '$modalInstance', 'column', '$firebaseObject',  function ($scope, $modalInstance, column, $firebaseObject) {

	function initScope(scope) {
		scope.columnName = column.name;
		scope.column = column;
		scope.title = '';
		scope.details = '';
	}

  $scope.addNewCard = function () {
    if (!this.newCardForm.$valid) {
      return false;
    }
    $modalInstance.close({title: this.title, column: column, details: this.details});
	 
		var ref = new Firebase(appUrl);
		var postsRef = ref.child("workspaceentires");
		var newPostRef = postsRef.push();
		newPostRef.set({
			workspace_id: this.columnName,
			url: this.title,
			description: this.details
		});
	window.location.href = '';
  };

  $scope.close = function () {
    $modalInstance.close();
  };

  initScope($scope);

}]);

