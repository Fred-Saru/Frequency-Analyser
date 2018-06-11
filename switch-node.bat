@echo off
set node10="C:\ProgramData\Oracle\Java\javapath;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\WebEx\Productivity Tools;C:\ProgramData\Oracle\Java\javapath;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\WebEx\Productivity Tools;C:\Users\alcidef\AppData\Local\Microsoft\WindowsApps;C:\Users\alcidef\AppData\Local\Programs\Git\cmd;C:\nodejs;"
set node6="C:\ProgramData\Oracle\Java\javapath;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\WebEx\Productivity Tools;C:\ProgramData\Oracle\Java\javapath;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\WebEx\Productivity Tools;C:\Users\alcidef\AppData\Local\Microsoft\WindowsApps;C:\Users\alcidef\AppData\Local\Programs\Git\cmd;C:\nodejs_v6;"

echo Select the environment needed: && echo 1. Nodejs version 10 && echo 2. Nodejs version 6 && echo.

set /P version=Response: 
set tempPath=""
IF "%version%"=="1" setx PATH %node10%

IF "%version%"=="2" setx PATH %node6%

echo Open a new command line with the new environment.
