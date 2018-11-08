$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<div style="width:35vw;" class="alert alert-primary" role="alert">').addClass('animated fadeInUp').text(msg));
  });
});