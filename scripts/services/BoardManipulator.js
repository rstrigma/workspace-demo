/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


/***********************************************************
		configure the Firebase Global Url
***********************************************************/

'use strict';

angular.module('demoApp').factory('BoardManipulator', function () {
  return {
    addColumn: function (board, columnName) {
		board.columns.push(new Column(columnName));
    },

    addCardToColumn: function (board, column, cardTitle, details) {
      angular.forEach(board.columns, function (col) {
			if (col.name === column.name) {
				col.cards.push(new Card(cardTitle, column.name, details));
			}
		});
    },
    removeCardFromColumn: function (board, column, card) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
			col.cards.splice(col.cards.indexOf(card), 1);
        }
      }); 
    }
 
  };
});