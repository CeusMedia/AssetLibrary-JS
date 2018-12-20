(function($)
  {
    jQuery.fn.suggestions = function(settings)
    {
      var containers = this;
      settings = jQuery.extend({
        inputSelector: "input#text",
        formSelector: "#form_search",
        boxSelector: "#suggestions",
        boxHTML: "<div id='suggestions'></div>",
        url: "suggest.php",
        key: "text"
      },settings);
      $(settings.inputSelector).attr('autocomplete','off').after(settings.boxHTML);
      $(document).click(function(){$(settings.boxSelector).hide()});
      $(settings.formSelector).submit(function(){$(settings.boxSelector).hide()});
      $(settings.inputSelector).keyup(
        function(){
          $(settings.boxSelector).hide();
          $.ajax({
            type: "GET",
            url: settings.url,
            data: settings.key+"="+this.value,
            success: function(html){
              if(html){
                $(settings.boxSelector).html(html).show();
                $(settings.boxSelector+" li").click(function(){
                  $(settings.inputSelector).val($(this).attr('rel'));
                  $(settings.boxSelector).hide();
                  $(settings.formSelector).submit()[0].submit;
                });
              }
            }
          });
        }
      );
    }
  }
)(jQuery);
