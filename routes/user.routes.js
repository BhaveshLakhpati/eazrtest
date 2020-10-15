const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); 

class ResponseModel {
    constructor(success, message) {
        this.success = success;
        this.message = message;
    }
}

this.createJWT = (user) => {
   const jwtoken = jwt.sign({ lastLoginTime: user.lastLoginTime }, "R@nsomw@r3", {
       expiresIn: "1 day"
   });

   return jwtoken;
}

module.exports = (app) => {
    // login route
    app.post('/login', (req, res, next) => {
        User.find({ email: req.body.email }).exec((err, data) => {
            // handle errors
            if(err)
                next(res, err);
            
            if(data.length == 0)
                res.json(new ResponseModel(false, "User not found"));
            else {
                let user = data[0];
                user.lastLoginTime = Date.now();

                let jwtoken = this.createJWT(user);
                res.header('X-Authorization', jwtoken).json(new ResponseModel(true, "Logged-in successfully" ));
            }
        });
    });

    // sign-up route
    app.post('/signup', (req, res, next) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        User.find({ email }).exec((err, data) => {
            if(err)
                next(res, err);
            
            if(data.length == 0) {
                const newUser = new User({ name, email, password, lastLoginTime: Date.now() });
                newUser.save();

                let jwtoken = this.createJWT(newUser);
                res.header('X-Authorization', jwtoken).json(new ResponseModel(true, "User created successfully"));
            } else
                res.json(new ResponseModel(false, "Email Address already in use." ));
        });
    });
}