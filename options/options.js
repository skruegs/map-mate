$(document).ready(function () {
  // handle events
  $('#save').on('click', onSave);

  // load saved address
  $('#address1').val(localStorage['address1']);

  // load saved transit option
  $('input[name=travel]').each(function () {
    if ($(this).val() === localStorage['travel']) {
      $(this).attr('checked', 'checked');
      console.log($(this).val());
    } else {
      $(this).removeAttr('checked');
    }
  });

});

function onSave() {
  localStorage['address1'] = $('#address1').val();
  localStorage['travel'] = $('input[name=travel]:checked').val();
}