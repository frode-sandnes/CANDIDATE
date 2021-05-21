// By Frode Eika Sandnes, Oslo Metropolitan University, Oslo, Norway, April 2021

function soundex(name)
	{
    let s = [];
    let si = 1;
    let c;

    //              ABCDEFGHIJKLMNOPQRSTUVWXYZ
    let mappings = "01230120022455012623010202";

    s[0] = name[0].toUpperCase();

    for(let i = 1, l = name.length; i < l; i++)
		{
        c = (name[i].toUpperCase()).charCodeAt(0) - 65;

        if(c >= 0 && c <= 25)
			{
            if(mappings[c] != '0')
				{
                if(mappings[c] != s[si-1])
					{
                    s[si] = mappings[c];
                    si++;
					}

/*                if(si > 3)
					{
                    break;
					}*/
				}
			}
		}

    if(si <= 3)
		{
        while(si <= 3)
			{
            s[si] = '0';
            si++;
			}
		}

    return s.join("");
	}

String.prototype.hashCode = function()
	{
    var hash = 0;
    for (var i = 0; i < this.length; i++) 
		{
        var character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
		}
    return hash;
	}	

// This implementation is taken from 	https://stackoverflow.com/questions/8353134/javascript-crc32-function-and-php-crc32-not-matching-for-utf8/8419366#8419366 
function Utf8Encode(string) 
	{
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
	}
function crc32(str) 
	{
    str = Utf8Encode(str);  
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    var crc = 0;
    var x = 0;
    var y = 0;

    crc = crc ^ (-1);
    for( var i = 0, iTop = str.length; i < iTop; i++ ) 
		{
        y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
        x = "0x" + table.substr( y * 9, 8 );
        crc = ( crc >>> 8 ) ^ x;
		}

    return (crc ^ (-1)) >>> 0;
	}	
// Reverse the string before djb2 hash.	
function djb2reverse(str)
	{
	s = str.split("").reverse().join("");
	return s.hashCode();
	}	
function crc32reverse(str)
	{
	s = str.split("").reverse().join("");
	return crc32(s);
	}		
// Shift the string n places before djb2 hash.	
function djb2shift(str,i)
	{
	head = str.substring(0,i);
	tail = str.substring(i);
	return (tail+head).hashCode();
	}
// add salt to string before djb hash
var salt = [];	// global variable
function loadSalts()	// called upon page load
	{
	var saltArea = document.getElementById("slistid").value;
	salt = saltArea.split("\n");
//tester();			// uncomment to run tester() function
	return false;	
	}
function djb2salt(str,i)
	{
	return (str+salt[i]).hashCode();
	}
function coding(name,L,type)
	{
	ID = -1;

	switch (type)
		{
		case 0: // default
				ID = Math.abs((name.hashCode())%L);
				break;
		case 1: // reverse
				ID = Math.abs(djb2reverse(name)%L);            
				break;
		case 2: // CRC
				ID = Math.abs(crc32(name)%L);                    
				break;
		case 3: // CRC reverse
				ID = Math.abs(crc32reverse(name)%L);                    
				break;
		// shift in ten steps
		case 4: case  5: case  6: case  7: case  8: 
				ID = Math.abs(djb2shift(name, type - 3)%L);                    
				break;
		default: // salt based on the value as index into salt array
				idx = type%salt.length;
				ID = Math.abs(djb2salt(name, idx)%L);                                  
				break;                    
		}
    return ID;
    }	

var validationOffset = 10; // global and arbitrary - and long away from the others	
// Search for a hash function type that results in unused IDs	
function findFreeCodingType(encodings, name, L)
	{
	// first find number of possible coding types
	var noCodingTypes = 14 + salt.length;
	for (var type=0;type<noCodingTypes;type++)
		{
		var ID = coding(name,L,type);
		if (!encodings.has(ID))
			{
			if (type == 0) // the default encoding
				{
				return type;
				}
			// check if validation code is free also
			ID = coding(name,L,0);  // the default code as we have collision
			var validation = coding(name,L,type+validationOffset);
//			if (validations.get(ID) == null || !validations.get(ID).has(validation))
			if (!encodings.has(getValidationKey(ID)) || !encodings.get(getValidationKey(ID)).includes(validation))
				{				
				return type;
				}	
			}
		}
	return -1; // could not find a match
	}
 function findEncoding(encodings, name, L)
	{
	// get the default (base) encoding
	var ID = coding(name,L,0);
	// lookup the coding type
	var types = encodings.get(ID);

	var validation = encodings.get(getValidationKey(ID));
	// find the one that is validtypes
	if (types == null)
		{
		return ID;
		}
	for (var i = 1;i < types.length;i++)
		{
		var type = types[i];
		var code = validation[i];
		var ID2 = coding(name,L,type);
		var valid = coding(name,L,type+validationOffset);
		// check that valid code is mathcing AND that it represent a valid value             
		if (valid == code && encodings.get(getValidationKey(ID2))!=null)
			{
			return ID2;
			} 
		}
	return ID;
	}   
function getValidationKey(id)
	{
	return ("valid-code-"+id);
	}	
function addPerson(encodings, name, L)
	{
	// simple coding
	var type = findFreeCodingType(encodings,name,L);
	var ID = coding(name,L,type); 
	var list  = [];
	list.push(0); // default encoindg
	encodings.set(ID, list);
	// add validation as well
	var list2 = [];
	list2.push(-1); // default, keep info to a mimium
	encodings.set(getValidationKey(ID), list2);
	                      
	if (type != 0) // if it is not default
		{
		// need to store what the coding shouuld be
		ID = coding(name,L,0); 
		encodings.get(ID).push(type); // add element
		if (!encodings.has(getValidationKey(ID)))
			{
			var list3  = [];
			encodings.set(getValidationKey(ID), list3);			
			}
		encodings.get(getValidationKey(ID)).push(coding(name,L,type+validationOffset)); // add element
		}   
	}

function encodePhonetic(name)
	{
	name = name.replace(",","");
	var parts = name.split(" ");
	parts.sort();
	var code = "";
	for (var x of parts)
		{
		code += soundex(x);
		}
	return code;	
	}	
			
	
// If using existing list we disable the configuration controls as they cannot be altered during an experiment	
function lockManualInput()
	{
	var jsn = document.getElementById("listid").value;
	if (jsn.length > 0)
		{
		document.forms["encodeform"]["N"].disabled = true;
		document.getElementById("Nid").style.color='lightgray';	
		document.forms["encodeform"]["ratio"].disabled = true;
		document.forms["encodeform"]["phonetic"].disabled = true;	
		// enable the lookup button
		document.forms["encodeform"]["lookupID"].disabled = false;	
		document.getElementById("L1").style.color='lightgray';		
		document.getElementById("L2").style.color='lightgray';		
		document.getElementById("L3").style.color='lightgray';		
		// get the parameters
		var IDs = new Map();
		// read and check JSON object
		if (!!jsn)	
			{			
			try 
				{
				IDs = new Map(JSON.parse(jsn));	
				} 
			catch (e) 
				{
				document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">"+e.name+" in ID-list: "+e.message+".</p>";	
				document.getElementById("listid").style.backgroundColor = 'pink';
				return false;	
				}
			var participants = IDs.get("particpants");
			var ratio = IDs.get("coding-ratio");
			var phonetic = IDs.get("phonetic-coding");		
			document.forms["encodeform"]["N"].value = participants;
			document.forms["encodeform"]["ratio"].value = ratio;
			document.forms["encodeform"]["phonetic"].checked = phonetic;			
			}				
		}
	else
		{
		document.forms["encodeform"]["N"].disabled = false;
		document.getElementById("Nid").style.color='';			
		document.forms["encodeform"]["ratio"].disabled = false;
		document.forms["encodeform"]["phonetic"].disabled = false;	
		document.getElementById("L1").style.color='';		
		document.getElementById("L2").style.color='';		
		document.getElementById("L3").style.color='';				
		}		
	return false;
	}
	
// If we run the procedure for the first time adding the first participant we disable the JSON input box
function lockAutoInput()
	{
	var participants = document.forms["encodeform"]["N"].value;	
	if (participants.length > 0)
		{
		document.getElementById("listid").disabled = true;
		document.getElementById("L0").style.color='lightgray';				
		}
	else
		{
		document.getElementById("listid").disabled = false;
		document.getElementById("L0").style.color='';				
		}		
	return false;
	}
	
function add()
{
	// reset background colours of UI elements 		
	document.getElementById("listid").style.backgroundColor = '';		
	document.forms["encodeform"]["name"].style.backgroundColor = '';
	document.forms["encodeform"]["ratio"].style.backgroundColor = '';
	document.forms["encodeform"]["N"].style.backgroundColor = '';
	var jsn = document.getElementById("listid").value;
	var IDs = new Map();
	
	if (!!jsn)	
		{			
		try 
			{
			IDs = new Map(JSON.parse(jsn));	
			} 
		catch (e) 
			{
			document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">"+e.name+" in ID-list: "+e.message+".</p>";	
			document.getElementById("listid").style.backgroundColor = 'pink';
			return false;	
			}			
		}
	var name = document.forms["encodeform"]["name"].value;
	if (name === "")
		{
		document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">Please input the participants name.</p>";
		document.forms["encodeform"]["name"].style.backgroundColor = 'pink';		
		return false;
		}
	var participants = document.forms["encodeform"]["N"].value;
	var ratio = document.forms["encodeform"]["ratio"].value;
	var phonetic = document.forms["encodeform"]["phonetic"].checked;
	
	if (!!jsn)
		{
		participants = IDs.get("particpants");
		ratio = IDs.get("coding-ratio");
		phonetic = IDs.get("phonetic-coding");	
		}
	else
		{				
		if (participants === "")
			{
			document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">Please input the maximum number of participants.</p>";
			document.forms["encodeform"]["N"].style.backgroundColor = 'pink';		
			return false;
			}			
		IDs.set("particpants",participants);
		IDs.set("coding-ratio",ratio);
		IDs.set("phonetic-coding",phonetic);
		}
	if (phonetic)
		{
		name = encodePhonetic(name);
		}
		
	var L = participants*ratio;

	// add the new element
	addPerson(IDs, name, L);
	var id = findEncoding(IDs, name, L);
	
	// provide feedback to user	
	document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">New particpant id: <b>"+id+"</b>. Remember to copy and store the updated list.</p>";		
	// set json background colour to indicate change		
	document.getElementById("listid").style.backgroundColor='lightpink';
	
	let str = JSON.stringify(Array.from(IDs.entries()), null, 2);
	document.getElementById("listid").value = str;
	lockManualInput();
	document.getElementById("listid").disabled = false;
	document.getElementById("L0").style.color='';		
	return false;
}

function lookup()
{
	// reset background colours of UI elements 		
	document.getElementById("listid").style.backgroundColor = '';		
	document.forms["encodeform"]["name"].style.backgroundColor = '';
	document.forms["encodeform"]["ratio"].style.backgroundColor = '';
	document.forms["encodeform"]["N"].style.backgroundColor = '';
	var jsn = document.getElementById("listid").value;
	var IDs = new Map();
	
	if (!!jsn)	
		{			
		try 
			{
			IDs = new Map(JSON.parse(jsn));	
			} 
		catch (e) 
			{
			document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">"+e.name+" in ID-list: "+e.message+".</p>";	
			document.getElementById("listid").style.backgroundColor = 'pink';
			return false;	
			}			
		}
	var name = document.forms["encodeform"]["name"].value;
	if (name === "")
		{
		document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">Please input the participants name.</p>";
		document.forms["encodeform"]["name"].style.backgroundColor = 'pink';		
		return false;
		}
	var participants = document.forms["encodeform"]["N"].value;
	var ratio = document.forms["encodeform"]["ratio"].value;
	var phonetic = document.forms["encodeform"]["phonetic"].checked;
	
	if (!!jsn)
		{
		participants = IDs.get("particpants");
		ratio = IDs.get("coding-ratio");
		phonetic = IDs.get("phonetic-coding");	
		}

	if (phonetic)
		{
		name = encodePhonetic(name);
		}
		
	var L = participants*ratio;

	var existingID = findEncoding(IDs, name, L)
	
	// provide feedback to user	
	document.getElementById("participantid").innerHTML = "<p style=\"color:rgb(255,0,0);\">Particpant id: <b>"+existingID+"</b>.</p>";		
	// set json background colour to indicate change		
	document.getElementById("listid").style.backgroundColor='';
	
	lockManualInput();
	return false;
}

// to link this testing routine - uncomment call in loadSalts() method which is called on page load
// output in console window (shift+control+J to view in chrome)
function tester()
	{
	// configurations		
	var sample = [
						"Rodman, David M.",
						"Penn, Dustin J.",
						"Bernard, Ora",
						"Chelune, Gordon J.",
						"Hoyle, Charles H.V.",
						"Mortensen, James K",
						"Wetterau, John R.",
						"Couper, Mick P.",
						"WPersson, Mats"
					   ];
	var participants = 10;
	var ratio = 1;
	// setup
	var L = participants*ratio;
	var IDs = new Map();
	// adding
	for (var name of sample)
		{
		var phon = encodePhonetic(name);			
		addPerson(IDs, phon, L);
		}
		
	// output datastructure
	let str = JSON.stringify(Array.from(IDs.entries()), null, 2);
	console.log(str);
	console.log("------------------------------");	
				
	// retrieving and output results
	console.log("Look for dubplicate numbers");
	var results = [];
	for (var name of sample)
		{
		var phon = encodePhonetic(name);			
		var id = findEncoding(IDs, phon, L);
		var output = ""+id+"\t "+name;
		if (results.includes(id))
			{
			output += "\t already exists";
			}
		else
			{
		    output += "\t ok";
			}
		results.push(id);
		console.log(output);
		}	
	}
	