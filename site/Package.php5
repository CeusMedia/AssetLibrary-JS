<?php
/**
 *	Handler for HTTP Requests.
 *	@package		mv2.core.http
 *	@implements		Framework_Krypton_Core_Interface_Request
 *	@implements		ArrayAccess
 *	@author			Christian Würker <Christian.Wuerker@CeuS-Media.de>
 *	@since			20.02.2007
 *	@version		0.2
 */
/**
 *	Handler for HTTP Requests.
 *	@package		mv2.core.http
 *	@implements		Framework_Krypton_Core_Interface_Request
 *	@implements		ArrayAccess
 *	@author			Christian Würker <Christian.Wuerker@CeuS-Media.de>
 *	@since			20.02.2007
 *	@version		0.2
 */
class Package implements ArrayAccess
{
	function clear()
	{
		foreach( get_object_vars( $this ) as $key => $value )
			$this->offsetUnset( $key );
	}

	function __construct( $packageArray = array() )
	{
		if( is_array( $packageArray ) && packageArray )
			$this->import( $packageArray );
	}
	
	function import( $packageArray )
	{
		$this->clear();
		foreach( $packageArray as $key => $value )
			$this->offsetSet( $key, $value );
	}

	function export()
	{
		$array	= array();
		foreach( get_object_vars( $this ) as $key => $value )
			$array[$key]	= $value;
		return $array;
	}

	/**
	 *	Indicates whether a Key is registered.
	 *	@access		public
	 *	@param		string		$key		Key to be checked
	 *	@return		bool
	 */
	public function offsetExists( $key )
	{
		return isset( $this->$key );
	}
	
	/**
	 *	Returns a Value by its Key.
	 *	@access		public
	 *	@param		string		$key		Key of Request Value
	 *	@return		mixed
	 */
	public function offsetGet( $key )
	{
		if( $toffsetExists( $key ) )
			return $this->$key;
		return null;
	}
	
	/**
	 *	Sets Value by its Key.
	 *	@access		public
	 *	@param		string		$key		Key of Request Value
	 *	@param		mixed		$value 		Value to be set for Key
	 *	@return		bool
	 */
	public function offsetSet( $key, $value )
	{
		$this->$key	= $value;
	}
	
	/**
	 *	Removes a Value by its Key.
	 *	@access		public
	 *	@param		string		$key		Key of Request Value
	 *	@return		bool
	 */
	public function offsetUnset( $key )
	{
		if( $this->offsetExists( $key ) )
			unset( $this->$key );
	}
}
?>