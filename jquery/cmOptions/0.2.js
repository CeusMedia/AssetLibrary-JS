/**
 * Options plugin for select boxes.
 *
 * Copyright (c) 2007 Christian Würker (ceus-media.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */


/**
 * Inserts new Options into Select Box.
 *
 * @example		$('#example').setOptions({label:'test 1',value:1},1);
 * @desc		Adds a new Option with Label 'test1' and Value 1 to Select with Id 'example'.
 *
 * @param		Array of new Options, given by properties 'value' and 'label'
 * @param		Value of Option to select
 * @type		jQuery
 *
 * @name		setOptions
 * @cat			Plugins/Options
 * @author		Christian Würker / christian.wuerker@ceusmedia.de
 */
jQuery.fn.setOptions = function(data,selected){
  for(i=0; i<data.length; i++ )
    $(this).addOption(data[i].label,data[i].value);
  if(selected)
    $(this).selectOption(selected);
}

/**
 * Gets  new Options into Select Box.
 *
 * @example		$('#example').set({value:1,label:'test 1'},1);
 * @desc		Adds a new Option with Value 1 and Label 'test1' to Select with Id 'example'.
 *
 * @param		Array of new Options, given by properties 'value' and 'label'
 * @type		jQuery
 *
 * @name		setOptions
 * @cat			Plugins/Options
 * @author		Christian Würker / christian.wuerker@ceusmedia.de
 */
jQuery.fn.ajaxOptions = function(settings){
  var container = this;
  settings = jQuery.extend({
    data: {},
    debug: true,
    async: true,
    selectFirst: true,
    selected: null
  },settings);

  $(this).addClass('loading');
  if(settings.async){
    $(this).attr('async',1);
    $.ajax({
      type: 'GET',
      url: settings.url,
      data: settings.data,
      dataType: 'json',
      async: true,
      error: function(request,string,exception){
        alert("Error loading JSON document: "+exception);
      },
      success: function(json){
        data = json['data'];
        devLog("data",settings.debug);
        for(i=0; i<data.length; i++ ){
          $("<option></option>").html(data[i].label).val(data[i].id).appendTo(container);
        }
        container.attr('async',0);
        if( !(settings.selected == null && !settings.selectFirst) )
          container.selectOption(settings.selected,settings.selectFirst);
        container.removeClass('loading');
      }
    });
  }
  else{
    response = $.ajax({
      type	: 'GET',
      url	: settings.url,
      data	: settings.data,
      async	: false
    }).responseText;
    eval("json = "+response);
    for(i=0; i<json.length; i++ )
      this.addOption(json[i].label,json[i].id);
    if( !(settings.selected == null && !settings.selectFirst) )
      this.selectOption(settings.selected,settings.selectFirst);
    this.removeClass('loading');
  }
  return this;
}

/**
 * Appends a new Option to Select Box.
 *
 * @example		$('#example').addOption('test 2',2,true);
 * @desc		Adds a new Option with Value 1 and Label 'test1' to Select with Id 'example'.
 *
 * @param		Label of new Option
 * @param		Value of new Option
 * @param		Select this new Option
 * @type		jQuery
 *
 * @name		addOption
 * @cat			Plugins/Options
 * @author		Christian Würker / christian.wuerker@ceusmedia.de
 */
jQuery.fn.addOption = function(label,value,selected){
  if( value )
/*    $(this).append("<option value='"+value+"'>"+label+"</option>");*/
    $(this).append( new Option( label, value ) );
  else if(label)
/*    $(this).append("<option>"+label+"</option>");*/
    $(this).append( new Option( label ) );
  if(selected)
    $(this).selectOption(value ? value : label);
}

/**
 * Selects an Option.
 *
 * @example		$('#example').selectOption(2);
 * @desc		Selects Option with Value 2 in Select with Id 'example'.
 *
 * @param		Value of Option to select
 * @param		Select first Option if Value not found
 * @type		jQuery
 *
 * @name		selectOption
 * @cat			Plugins/Options
 * @author		Christian Würker / christian.wuerker@ceusmedia.de
 */
jQuery.fn.selectOption = function(value,elseFirst){
  if(this.attr('async')==1)
    alert("Option can't be selected because select box is still loading. Use sync AJAX instead.");
  option = $("option[@value='"+value+"']",this);
  if( !option.size() ){
    option = $("option['"+value+"']",this);
  	if( !option.size() ){
	  if( elseFirst )
		option = $("option:eq(0)",this);
	  else
	    return false;
    }
  }
  option.attr('selected', 'selected' );
  return true;
}
