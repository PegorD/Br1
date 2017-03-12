'use strict';
(function () {
    var prizes = "";
    $(document).ready(function () {
        var prizehtml = '';
        
        var htmlcode = '';

        $.when(
            $.get('../HTML/prizelist.html', function (data) { prizehtml = data; }),
            $.get('../Data/prizelist.json', function (data) {
                prizes = data['PrizeList'];
                prizes.sort(function (a, b) {
                    if (a.PrizeName < b.PrizeName) return -1;
                    if (a.PrizeName > b.PrizeName) return 1;
                    return 0;
                });
            })).done(
            function () {
                var i = 0;
                for (i = 0; i < prizes.length; i++) {
                    htmlcode += createRow(prizehtml, i);
                   }
                $('#list').append(htmlcode);

            }
            );

    });


    function createRow(code, index) {
        var tempcode = '';
        tempcode = code;

        var $tempcode = $(tempcode);

        $tempcode.find('.PrizeName').text(prizes[index].PrizeName);
        $tempcode.find('.PrizeDescription').text(prizes[index].Description);

        return $tempcode.html();
    }

})();