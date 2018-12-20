/**
 *	jQuery Plugin for CeuS Media Net Services Index (and its Filter).
 *	@name		cmServiceIndex
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional)			Customize your Service Index
 *	@option		string		searchDelay					Delay for keyup Event Handler in Search Input Box
 *	@option		string		selectorList				jQuery Selector of Service List Table
 *	@option		string		selectorMessage				jQuery Selector of Service List Message Area
 *	@option		string		selectorFilter				jQuery Selector of Service Filter
 *	@option		string		selectorFilterFormat		jQuery Selector of Format Selector within Service Filter
 *	@option		string		selectorFilterSearch		jQuery Selector of Search Input Box within Service Filter
 *	@option		string		selectorFilterClasses		jQuery Selector of Class Toggler within Service Filter
 *	@option		string		selectorFilterRules			jQuery Selector of Rule Toggler within Service Filter
 *	@option		string		selectorResultNumber		jQuery Selector of Element showing Number of found Services
 *	@option		string		selectorTableClasses		jQuery Selector of Class Area within Service List
 *	@option		string		selectorFilterClasses		jQuery Selector of Rules Area within Service List
 *	@option		string		useBlitz					Flag: use cmBlitz to hilight List Updates
 *	@option		string		classClicked				CSS Class of clicked Service Rows
 */
(function($){
  jQuery.fn.cmServiceIndex = function(settings){
    settings = jQuery.extend({
      searchDelay           : 100,
      selectorList          : "table.list.services",
      selectorMessage       : "#message",
      selectorFilter        : "#filter",
      selectorFilterFormat  : "#filter_format",
      selectorFilterSearch  : "#filter_search",
      selectorFilterClasses : "#filter_classes",
      selectorFilterRules   : "#filter_rules",
      selectorResultNumber  : "#serviceCounter",
      selectorTableClasses  : ".className",
      selectorTableRules    : ".rules",
      useBlitz              : true,
      classClicked          : "clicked"
    },settings);

    var container = this;
    this.filterValue;
    this.searchValue;
    this.timeoutSearch;
    this.initMode	= 1;
    var nodeList = $(settings.selectorList);
    var nodeFilter = $(settings.selectorFilter);

    this.finishIndexSearch = function(){
      count = $("tbody tr.service:visible",nodeList).size();
      if(!count)
        $(settings.selectorMessage).show();
      $(settings.selectorResultNumber).html(""+count);
      if(!this.initMode && settings.useBlitz)
        $(settings.selectorResultNumber).html(""+count).cmBlitz();
    }

    this.resetIndex = function(value){
      $("tbody tr",nodeList).show();
      if(value)
/*        $("tbody tr th:parent:not(:first)",nodeList).hide();*/
        $("tbody tr th:parent:not(:first)",nodeList).hide();
      if(container.filterValue)
        $(settings.selectorFilterFormat,nodeFilter).trigger('change');
      if(container.searchValue)
        $(settings.selectorFilterSearch,nodeFilter).trigger('keyup');
    }

    this.setIndexSearch = function(value){
      container.searchValue="";
      container.resetIndex(value);
      $(settings.selectorMessage).hide();
      if(value){
        container.searchValue = value;
        $("tbody tr td div.serviceName:not(:contains("+value+"))",nodeList).parent().parent().hide();
        $("tbody tr th:parent",nodeList).hide();
      }
      if(!container.initMode && settings.useBlitz)
        nodeList.cmBlitz();
      this.finishIndexSearch();
    }

    this.setFilter = function(value){
      container.filterValue="";
      container.resetIndex(value);
      $(settings.selectorMessage).hide();
      if(value){
        container.filterValue = value;
        $("tbody tr:not(."+value+")",nodeList).hide();
      }
      container.finishIndexSearch();
    }

    this.setup = function(){
      $(settings.selectorMessage).hide();

      /*  Show Rules */
      $(settings.selectorFilterRules,nodeFilter).change(function(){
        var element = $(settings.selectorTableRules,nodeList);
        this.checked ? element.show() : element.hide();
        if(!container.initMode && settings.useBlitz)
          nodeList.cmBlitz();
      });
      $(settings.selectorFilterRules,nodeFilter).trigger('change');

      /*  Show Classes */
      $(settings.selectorFilterClasses,nodeFilter).change(function(){
        var element = $(settings.selectorTableClasses,nodeList);
        this.checked ? element.show() : element.hide();
        if(!container.initMode && settings.useBlitz)
          nodeList.cmBlitz();
      });
      $(settings.selectorFilterClasses,nodeFilter).trigger('change');

      /*  Filter Format */
      $(settings.selectorFilterFormat,nodeFilter).change(function(){
        container.setFilter($(this).val());
        if(!container.initMode && settings.useBlitz)
          nodeList.cmBlitz();
      });
      $(settings.selectorFilterFormat,nodeFilter).trigger('change');

      /*  Activate Search */
      $(settings.selectorFilterSearch,nodeFilter).keyup(function(){
        clearTimeout(container.timeoutSearch);
        var indexSearchInput = this;
        container.timeoutSearch = setTimeout(function(){
            container.setIndexSearch($(indexSearchInput).val());
          }
          ,settings.searchDelay);
      });
      $(settings.selectorFilterSearch,nodeFilter).focus();

      /*  Format Columns */
      $("tr th a.format",nodeList).click(function(){
        var value = $(this).html().toLowerCase();
        $(settings.selectorFilterFormat,nodeFilter).val(value).trigger("change");
      });

      /*  Service Rows */
      $("tr",nodeList).click(function(){
        $(this).toggleClass(settings.classClicked);
      });

      container.initMode=0;
    }
    this.setup();
  }
})(jQuery);