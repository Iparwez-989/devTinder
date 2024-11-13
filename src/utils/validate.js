const validator = require('validator')
const validateSignupData = (req)=>{

    const{firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName){
        throw new Error('Name should not be empty')
    }
    else if(!validator.isEmail(email)){
        throw new Error('Invalid email entered')
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('Password must be of atleast 8 characters and contains 1 lowercase 1 uppercase and an special character.')
    }

}

module.exports = {validateSignupData,}