angular.module('app.directives', [])

.directive('ccScroll', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ccScroll, function (value) {
                $(element).animate({ scrollTop: value }, 600);
            }, true);
        }
    }
})

.directive('ccProgress', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/progress.html',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ccProgressData, function (value) {
                _.each(_.range(5), function (i) {
                    var thisAnswerTypeCount = _.filter(value, function (question) { return question.answer === (i + 1) }).length;
                    scope["s" + (i + 1)] = (thisAnswerTypeCount * 2) + "%";
                });
            }, true);
        }
    }
})

.directive('ccQuestionButtons', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: { question: "=ccQuestion", submit: "=ccSubmitAnswerFn" },
        templateUrl: 'templates/questionButtons.html',
        link: function (scope, element, attrs) {

            scope.buttons = [
                { text: 'Dislike very much', class: 'danger' },
                { text: 'Dislike', class: 'warning' },
                { text: 'Does not matter', class: 'info' },
                { text: 'Like', class: 'primary' },
                { text: 'Like very much', class: 'success' }
            ];

            scope.localClick = function (index) {
                if (scope.question.disabled) {
                    return;
                };
                scope.submit(scope.question.id, index + 1);
            };
        }
    }
})