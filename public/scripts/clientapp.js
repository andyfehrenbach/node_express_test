$(document).ready(function() {
  getData();
  $('#submit-button').on('click', sendAnimal);
});

function sendAnimal() {
  event.preventDefault();

  var values = {};

  values.animalName = $('#animal').val();
  console.log(values);

  $.ajax({
      type: 'POST',
      url: '/zoo_data',
      data: values,
      success: function(data) {
        console.log('form server :' + values.animalName);
         getData(data);
      }

    });
}

function getData() {
    $.ajax({
    type: 'GET',
    url: '/zoo_data',
    success: function(data) {
      console.log(data);
      appendDom(data);
    }
  });
}

function appendDom(data) {
  $('.animal-data').empty();

  for (var i = 0; i < data.length; i++) {
    $('.animal-data').append('<div class="animal-unit"></div>');
    var $el = $('.animal-data').children().last();
    $el.append('<h2> Animal: ' + data[i].animal + '</h2>');
    $el.append('<h2 class="right"> Quantity: ' + data[i].qty + '</h2>');

  }
}
