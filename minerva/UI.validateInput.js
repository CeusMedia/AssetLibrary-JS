var smalls	= new Array ("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß");
var larges	= new Array ("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ä", "Ö", "Ü");
var digit	= new Array ("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
var symbols = new Array ("_", "-", "@", "/", "%", "+", ":", "(", ")", "~");
var dot		= new Array (".");
var comma	= new Array (",");
var hyphen	= new Array ("-");
var space	= new Array (" ");

// "%", "&", "/", "=", "?", "+", "-", "_", "*", ",", ";", ".", ":", "(", ")"

function allowOnly (element, type)
{
	var value = element.value;
	var len = value.length;
	var legal = new Array ();

	if (type == "numeric")
	{
		legal = digit;
	}
	else if (type == "dotnumeric")
	{
		legal = digit.concat(comma.concat(dot));
	}
	else if (type == "float")
	{
		legal = digit.concat(dot);
	}
	else if (type == "letter")
	{
		legal = smalls.concat(larges);
	}
	else if (type == "alpha")
	{
		legal = digit.concat(smalls.concat(larges));
	}
	else if (type == "alphasymbol")
	{
		legal = symbols.concat(digit.concat(smalls.concat(larges)));
	}
	else if (type == "alphahyphen")
	{
		legal = hyphen.concat(digit.concat(smalls.concat(larges)));
	}
	else if (type == "alphaspace")
	{
		legal = space.concat(digit.concat(smalls.concat(larges)));
	}
	else if (type == "email")
	{
		legal = dot.concat(symbols.concat(digit.concat(smalls.concat(larges))));
	}
	else if (type == "all")
	{
		legal = new Array ();
		legal = legal.concat(hyphen);
		legal = legal.concat(dot);
		legal = legal.concat(comma);
		legal = legal.concat(symbols);
		legal = legal.concat(space);
		legal = legal.concat(digit);
		legal = legal.concat(smalls);
		legal = legal.concat(larges);
	}
	else
	{
		return true;
	}
	for (var i=0; i<len; i++)
	{
		var found = false;
		var sign = value.substr (i, 1);
		for (j=0; j<legal.length; j++)
		{
			if (sign === legal[j]) found = true;
		}
		if (!found)
		{
			value = value.substr(0,i) + value.substring(i+1);
			len --;
			i--;
		}
	}
	if (element.value != value)
	{
		element.value = value;
		return false;
	}
	return true;
}

function validate ()
{

}