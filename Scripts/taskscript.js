'use strict';
var tasks = "";
(function () {
    
    $(document).ready(function () {
        var taskhtml = '';

        var htmlcode = '';

        $.when(
            $.get('../HTML/tasklist.html', function (data) { taskhtml = data; }),
            $.get('../Data/tasklist.json', function (data) {
                tasks = data['TaskList'];
                tasks.sort(function (a, b) {
                    if (parseInt(a.TaskID) < parseInt(b.TaskID)) return -1;
                    if (parseInt(a.TaskID) > parseInt(b.TaskID)) return 1;
                    return 0;
                });
            })).done(
            function () {
                var i = 0;
                for (i = 0; i < tasks.length; i++) {
                    htmlcode += createRow(taskhtml, i);
                    }
                $('#list').append(htmlcode);

            }
            );

    });


    function createRow(code, index) {
        var tempcode = '';
        tempcode = code;

        var $tempcode = $(tempcode);

        $tempcode.find('.TaskID').text(tasks[index].TaskID);
        $tempcode.find('.TaskName').text(tasks[index].TaskName);
        $tempcode.find('.Points').text(tasks[index].TaskPoints);
        $tempcode.find('.Time').text(tasks[index].Time);
        $tempcode.find('.BookedBy').text(tasks[index].BookedBy);
        $tempcode.find('.BookDate').text(tasks[index].BookingDate);
        $tempcode.find('.BookingStatus').text(tasks[index].BookingStatus);
        var subtasks = '';
        var i = 0;
        for (i = 1; i < tasks[index].SubTasks.length; i++) {
            subtasks += tasks[index].SubTasks[i] + '<br />';
        }
        $tempcode.find('.SubTasks').append(subtasks);
        $tempcode.find('.Comments').text(tasks[index].Comments);
        $tempcode.find('.divTableRow1E').attr('id', tasks[index].TaskID);
        
        switch(tasks[index].BookingStatus) {
            case 'Unavailable':
                $tempcode.find('.divTable1').css('background-color','grey');
                break;
            case 'Available':
                $tempcode.find('.divTable1').css('background-color','white');
                break;
            case 'Pending':
                $tempcode.find('.divTable1').css('background-color','orange');
                break;
            case 'Booked':
                $tempcode.find('.divTable1').css('background-color','#0066FF');
                break;
            case 'Completed':
                $tempcode.find('.divTable1').css('background-color','#33CC33');
                break;
           default:
                $tempcode.find('.divTable1').css('background-color','white');
} 

        return $tempcode.html();
    }

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
       $('.modal').css('display','none');
    }
});
   

})();

function preparemodal(elem) {
    var TaskID = $(elem).attr('id');
    var i = 0;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].TaskID == TaskID) {
            $('#TaskID').text(tasks[i].TaskID);
            $('#TaskName').text(tasks[i].TaskName);
            $('#Points').text(tasks[i].TaskPoints);
            $('#Time').text(tasks[i].Time);
            $('#BookedBy').text(tasks[i].BookedBy);
            $('#BookDate').text(tasks[i].BookingDate);
            $('#BookingStatus').text(tasks[i].BookingStatus);
            var subtasks = '';
            var j = 0;
            for (j = 0; j < tasks[i].SubTasks.length; j++) {
                subtasks += tasks[i].SubTasks[j] + '<br />';
            }
            $('#SubTasks').html('');
            $('#SubTasks').append(subtasks);
            $('#Comments').text(tasks[i].Comments);
            break;
        }
       }
    $('.modal').css('display','block');
}

