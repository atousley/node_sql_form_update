$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
            $('#sql-form').find('input[type=text]').val('');
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            $('.responses').children().remove();
            data.forEach(function(person) {
                $('.responses').append('<p></p>');

                var $el = $('.responses').children().last();

                $el.append(person.id + ': ');
                $el.append(person.name + ', ');
                $el.append(person.address + ', ');
                $el.append(person.city + ', ');
                $el.append(person.state + ', ');
                $el.append(person.zip_code);
            })


        }
    });
}