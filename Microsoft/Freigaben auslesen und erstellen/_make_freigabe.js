// die beiden Variablen src und dst werden vom CMD-Script in diese Datei geschrieben!
//var src=""; 
//var dst="";

// Ausgabe von RMTSHARE einlesen
var fp1 = OpenFile(src, "r");  
var dat = fp1.ReadAll(); // Inhalt der Datei in msg schieben
fp1.Close();

var s;
var x,i,flagpm;
var _share_name;
var _path;
var _permissions;
var _CMD;

flagpm=0;

var fp2 = CreateFile(dst); // Befehl zur Erstellung der Freigabe

// Nun die einzelnen Infos der Freigabe ermitteln
var zeilen = dat.split("\r\n");
x = 0;
flag=1;
_CMD="net share ";
_permissions = "";
for (i = 0; i < zeilen.length; i++) {
  if (zeilen[i].indexOf("The command completed successfully") == 0) {
    flagpm=0;
    _CMD += _permissions;
    fp2.WriteLine(_CMD);
    x++;
  }  

  // einzelne Werte auslesen
  if (zeilen[i].indexOf("Share name") == 0) {
    _share_name = getWert(zeilen[i]);
    _CMD += _share_name + "=";
  }  
  if (zeilen[i].indexOf("Path") == 0) {
    _path = getWert(zeilen[i]);
    _CMD += "\"" + _path + "\"";
  }  
  if (flagpm == 1) {
    s = trimString(zeilen[i]);
    if (s.length > 0) {
	  // in s steht z.B.: "SRV01\mustermann  :  CHANGE"
	  s = aendereRecht(s); 
	  //WScript.Echo("["+s+"]");
      _permissions += " /GRANT:" + s;
    }
  }   
  if (zeilen[i].indexOf("Permissions") == 0) {
    // Die User/Rechte stehen in den folgenden Zeilen, bis eine Leerzeile kommt.
    flagpm++;      
  }  
    
}
fp2.Close();

/** liefert einen Wert, der hinter einer Variable steht
 *  012345678901234567890...
 * "Share name        \\srv01\daten"   --> "\\srv01\daten"
 * "Path              D:\daten" --> "D:\daten"
 *
 * @param s gesamter String
 * @return wert
 */
 // MUSS AUF DIE LÄNGE VOM SERVERNAME ANGEPASST WERDEN!!!!! 
function getWert(s) {
  s = s.substr(17);
  s = trimString(s);
  return s;  
}  

/** String mit Useraccount : Recht ändern
 * In: "DOMAENE\mustermann  :  CHANGE"
 * Out: "DOMAENE\mustermann:C"
 */
function aendereRecht(s) {
  var sa = trimString(s.substring(0, s.indexOf(":")));
  var sb = trimString(s.substr(s.indexOf(":") + 1));
  return "\"" + sa + "\"," + sb.substr(0);
}

/** Entfernt fuehrende und schliessende Leerzeichen bei einem String.
 * @param txt String mit optionalen Leerzeichen am Anfang und Ende.
 * @return String ohne Leerzeichen.
 */
function trimString(txt) {
  if (txt != null) {
    txt = String(txt);
    txt = txt.replace(/^[\s\xA0]+/, "");
    txt = txt.replace(/[\s\xA0]+$/, "");
  }
  return(txt);
}

/** Create TextDatei.
 * @param name String kompletter Dateiname
 * @return tf  Objekt FilePointer
 */
function CreateFile(name) {
  var fso, tf;
  fso = new ActiveXObject("Scripting.FileSystemObject");
  tf = fso.CreateTextFile(name, true);
  return tf;
}

/** Open TextDatei.
 * @param name String kompletter Dateiname
 * @return tf  Objekt FilePointer
 */
function OpenFile(name, mod) {
  var fso, tf, mode;
  if (mod == "r") {
    mode = 1;
  }  
  if (mod == "w") {
    mode = 2;
  }  
  if (mod == "a") {
    mode = 8;
  }  
  fso = new ActiveXObject("Scripting.FileSystemObject");
  tf = fso.OpenTextFile(name, mode);
  return tf;
}
