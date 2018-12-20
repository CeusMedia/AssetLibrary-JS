$(document).ready(function(){
  $("#messages div.error label").each(function(){
    id = $(this).attr('for');
    $(this).click(function(){document.location.href="#"+id});
    $("#content table td.label label[@for='"+id+"']").parent().addClass('error');
    $("#"+id).change(function(){
      $(this).parent().removeClass('error');
      $("#content table td.label label[@for='"+$(this).attr('id')+"']").parent().removeClass('error');
    }).parent().addClass('error');
  });
});
