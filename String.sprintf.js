if( !String.sprintf ) {
	function sprintf() {
		if( sprintf.arguments.length < 2 ) {
			return '';
		}

		var data = sprintf.arguments[ 0 ];

		for( var k=1; k<sprintf.arguments.length; ++k ) {

			switch( typeof( sprintf.arguments[ k ] ) )
			{
				case 'string':
					data = data.replace( /%s/, sprintf.arguments[ k ] );
					break;
				case 'number':
					data = data.replace( /%d/, sprintf.arguments[ k ] );
					break;
				case 'boolean':
					data = data.replace( /%b/, sprintf.arguments[ k ] ? 'true' : 'false' );
					break;
				default:
					/// function | object | undefined
					break;
			}
		}
		return data;
	}
	String.sprintf = sprintf;
}