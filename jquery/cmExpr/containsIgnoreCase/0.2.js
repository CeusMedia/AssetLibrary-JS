/* for jQuery 1.8+ */
jQuery.expr[":"].containsIgnoreCase = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
