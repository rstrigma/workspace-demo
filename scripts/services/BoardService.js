/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('demoApp').service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

  return {
    removeCard: function (board, column, card) {
        BoardManipulator.removeCardFromColumn(board, column, card);
    },

    addNewCard: function (board, column) {
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/newcard.html',
        controller: 'NewCardController',
        backdrop: 'static',
        resolve: {
          column: function () {
            return column;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) {
        if (cardDetails) {
			BoardManipulator.addCardToColumn(board, cardDetails.column, cardDetails.title, cardDetails.bkmrk_id);
        }
      });
    },
	
	editCard: function (column, carddetails) {
		var setColumn = [];
		setColumn.push({firebase_id:carddetails,column});
		var modalInstance = $modal.open({
			templateUrl: 'views/partials/editcard.html',
			controller: 'EditCardController',
			backdrop: 'static',
			resolve: {
			  column: function () {
				return setColumn;
			  }
			}
		});
    },
	
    kanbanBoard: function (board) {
		
		var kanbanBoard = new Board(board.name, board.numberOfColumns);
		angular.forEach(board.columns, function (column) {
		
        BoardManipulator.addColumn(kanbanBoard, column.name);
        angular.forEach(column.cards, function (card, index) {
			BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, column.firebaseid[index].firebaseid);
        });
      });
      return kanbanBoard;
    }
	
  };
}]);