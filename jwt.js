//console.clear()//
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const port = 3000;


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.get ('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
    

});

app.get ('/home', (req, res) => {
    console.log("COOKIE", req.cookies)

    if (!req.cookies.token) return res.redirect('/error')
    
    try {
        jwt.verify(req.cookies.token, "123456")        
        res.sendFile(__dirname + "/data.html")

    } catch {
        return res.redirect('/error')
    }

});

app.get ('/error', (req, res) => {
    res.sendFile(__dirname + "/error.html")

});
app.post('/login', (req, res) => {    
        console.log(req.body)

     if(req.body.user == "admin" && req.body.pass == "1234") {
        //GET TOKEN -> REDIRECT -> HOME//
        const token = jwt.sign({username: "admin"}, "123456")

    
        res.cookie('token', token)
        res.redirect('/home')
        
     }
     else {
        res.cookie('token', "")
        res.redirect('/')
    }    

})

app.get('/logout',(req,res) =>{
    res.cookie("token", "")
    res.redirect('/')

})

app.listen(port, () => {
console.log(`Listening at http://Localhost:${port}`)
});
