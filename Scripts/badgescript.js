'use strict';
var badges = "";
(function () {
    
    $(document).ready(function () {
        var badgehtml = '';

        var htmlcode = '';

        $.when(
            $.get('Data/badges.json', function (data) {
                badges = data['Badges'];         
            })).done(
            function () {
                var i = 0;
                for (i = 0; i < badges.length; i++) {
                    htmlcode += createColumn(i);
                    }
                $('#badges').append(htmlcode);

            }
            );

    });


    function createColumn(index) {
        var tempcode = '';
        
		tempcode='<div class="badge" style="display:inline-block">';
		
		tempcode+=badges[index].Name+ '<br />'; 
       
        var i = 0;
        for (i = 1; i < badges[index].Assigned.length; i++) {
            tempcode += badges[index].Assigned[i] + '<br />';
        }
       tempcode+='</div>';
       return tempcode;
    }
  

})();

