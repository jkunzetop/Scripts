Script zum auslesen und erstellen von Freigaben / NTFS Rechten.

Ordnerstruktur muss beibehaltwen werden bei download des scripts!

1. batchfrei.cmd auf dem gewünschten Server mti Adminrechten ausführen
2. Entstehende make_freigaben.cmd.txt öffnen
3. \\SERVERNAME und " Control" (WICHTIG VOR CONTROL DIE LEERZEILE) ersetzen durch nichts bsp:

VORHER!!
net share \\JENS-PC\C="C:\" /GRANT:"JENS-PC\admin",FULL CONTROL
NACHHER!!
net share C="C:\" /GRANT:"JENS-PC\admin",FULL

4. make_freigaben.cmd.txt umbennen zu make_freigaben.cmd
5. Ausführen und Hayppe sein

@ Fragen an JK