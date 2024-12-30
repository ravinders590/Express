Express setup:
note: Firstally install node js in your system.
1. npm init
2. npm i express

Scss setup:
1. npm i sass

EJS setup:
1. npm i ejs
2. config -> app.set("view engine","ejs")
3. app.render("index") //all file should under view folder with ejs extension.
4. app.render("index" ,{data}); // if pass any data in particular file then pass as a params.
