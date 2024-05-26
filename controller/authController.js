const User = require("../Model/user.js");
const hashPassword = require("../helper/register.js");
const compare = require("../helper/login.js");

// register
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "password is required",
      });
    }

    const hashedPassword = await hashPassword(password, 10);
    await new User({
      email: email,
      password: hashedPassword,
    }).save();

    return res.json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in registeration",
    });
  }
};

// login user
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "password is required",
      });
    }

    const user = await User.findOne({email : email});
    if (!user){
        return res.json({
            success : false ,
            message : "User is already exist"
        })
    }


    const isPasswordCorrect = await compare(password , user.password);

    if (!isPasswordCorrect){
        return res.json({
            success : false ,
            message : "Wrong password"
        })
    }

    req.session.userId = user._id;
    console.log(req.session.userId);
    
    return res.json({
        success : true , 
        message : "User is Logged in successfuly"
    })

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in login",
    });
  }
};


module.exports.checkSession = (req , res)=> {
  console.log(req.session);
 return res.json({
  success : true
 }) 
}


