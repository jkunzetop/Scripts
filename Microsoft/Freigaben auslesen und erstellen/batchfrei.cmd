set SRV=%COMPUTERNAME%
set TMP=~~mf.txt
set RSH=~~rsh.txt
set JS=~~make_share.js
set OUT=~~make-cmd.tmp
set CMD=_make_freigaben_cmd.txt
set LOG=_make_frg_rmtshare.log
set TRENN=~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

echo %TRENN% > %LOG%
echo @echo off > %CMD%

echo var src="%RSH%"; > %JS%
echo var dst="%OUT%"; >> %JS%
type _make_freigabe.js >> %JS%

:: Alle Freigaben ermitteln
net share | find ":\" > %TMP%

for /F %%i IN (%TMP%) do call :PROC1 %%i

goto ENDE

:PROC1
:: Aktion pro Freigabe (eine Zeile aus %TMP%)
echo [%1]
:: Freigabe-Infos von Quellserver ermitteln
rmtshare \\%SRV%\%1 > %RSH%
type %RSH% >> %LOG%
echo %TRENN% >> %LOG%
:: Freigabe Befehlsdatei erstellen
cscript /nologo %JS%
type %OUT% >> %CMD%
goto :EOF

:ENDE

del %TMP%
del %RSH%
del %JS%
del %OUT%
set TMP=
set RSH=
set JS=
set OUT=
set CMD=
set SRV=
set LOG=
set TRENN=