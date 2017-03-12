'use strict';
(function () {
    var scores = "";
    $(document).ready(function () {
        var scorehtml = '';

        var htmlcode = '';

        $.when(
            $.get('../HTML/scorelist.html', function (data) { scorehtml = data; }),
            $.get('../Data/scorelist.json', function (data) {
                scores = data['ScoreList'];
                scores.sort(function (a, b) {
                    if (parseInt(a.TaskID) < parseInt(b.TaskID)) return -1;
                    if (parseInt(a.TaskID) > parseInt(b.TaskID)) return 1;
                    return 0;
                });
            })).done(
            function () {
                var i = 0;
                for (i = 0; i < scores.length; i++) {
                    htmlcode += createRow(scorehtml, i);
                }
                $('#list').append(htmlcode);

            }
            );

    });


    function createRow(code, index) {
        var tempcode = '';
        tempcode = code;

        var $tempcode = $(tempcode);

        $tempcode.find('.TeamName').text(scores[index].TeamName);
        $tempcode.find('.TeamPoints').text(scores[index].Points);

        return $tempcode.html();
    }

})();