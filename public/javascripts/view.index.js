function addFact(fact) {
  $('<li>').appendTo('#facts').text(fact);
}

$(function() {
  $('#right-column').hide();

  $('li.hero-name a').click(function() {
  
    var name = $(this).text();
    
    $('#right-column h2').text(name);
  
    $('#facts li').remove();
    
    $.getJSON('/hero/' + name, function(data) {
      for (var i = 0; i < data.length; i++) {
        addFact(data[i]);
      }
    });
    
    $('#right-column').show();
    
    return false;
  });
  
  $('#add-new-fact').click(function() {
    
    var name = $('#right-column h2').text();
    var fact = $('#new-fact').val();
  
    $.ajax({
      type: "POST",
      url: "/hero/addFact",
      data: JSON.stringify({ name: name, fact: fact }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        addFact(fact);
        $('#new-fact').val('');
      },
      error: function(err) {
        var msg = 'Status: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
    return false;
  });
});
