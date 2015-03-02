@echo off 
net share temp2="C:\temp2" /GRANT:"\Jeder",READ /GRANT:"TECHNIK\jkunze",FULL
net share temp5="C:\temp2" /GRANT:"\Jeder",READ /GRANT:"TECHNIK\jkunze",FULL
net share test="C:\freigaben\test" /GRANT:"\Jeder",FULL
net share test1="C:\freigaben\test1" /GRANT:"TECHNIK\jkunze",FULL /GRANT:"TECHNIK\Technik",READ /GRANT:"TECHNIK\tuhlig",CHANGE
net share test3="C:\freigaben\test3" /GRANT:"\Jeder",FULL
