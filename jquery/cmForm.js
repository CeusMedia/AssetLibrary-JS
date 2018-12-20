$(document).ready(function(){
  if( $.browser.mozilla ){
    $( 'form.cmForm' ).hide().end();													// Hide forms
    $( 'form.cmForm' ).find( 'li>label' ).not( '.nocmx' ).each( function( i ){		// Processing
      var labelContent = this.innerHTML;
      var labelWidth = document.defaultView.getComputedStyle( this, '' ).getPropertyValue( 'width' );
      var labelSpan = document.createElement( 'span' );
          labelSpan.style.display = 'block';
          labelSpan.style.width = labelWidth;
          labelSpan.innerHTML = labelContent;
      this.style.display = '-moz-inline-box';
      this.innerHTML = null;
      this.appendChild( labelSpan );
    } ).end();
    $( 'form.cmForm' ).show().end();													// Show forms
  }
});