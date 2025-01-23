set SOURCE=.\docs

call npm run prod

set TARGET=..\http\src\main\resources\static
call copy %SOURCE%\js\osmp.js %TARGET%\js
call copy %SOURCE%\js\osmpmob.js %TARGET%\js
call copy %SOURCE%\js\pndmob.js %TARGET%\js
call copy %SOURCE%\js\contract.js %TARGET%\js
call copy %SOURCE%\js\schedule.js %TARGET%\js
call copy %SOURCE%\js\admin.js %TARGET%\js

set TARGET=..\dmc\src\main\resources\static
call copy %SOURCE%\js\osmp.js %TARGET%\js
call copy %SOURCE%\js\osmpmob.js %TARGET%\js
call copy %SOURCE%\js\pndmob.js %TARGET%\js
call copy %SOURCE%\js\contract.js %TARGET%\js
call copy %SOURCE%\js\schedule.js %TARGET%\js
call copy %SOURCE%\js\admin.js %TARGET%\js

set TARGET=..\online\src\main\resources\static
call copy %SOURCE%\js\office.js %TARGET%\js
call copy %SOURCE%\js\activate.js %TARGET%\js
call copy %SOURCE%\js\changepassword.js %TARGET%\js
call copy %SOURCE%\js\schedule.js %TARGET%\js
