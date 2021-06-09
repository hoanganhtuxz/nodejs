export const userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contains @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength(
            { min: 6 }
        )
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    next();
}




// import formiable from 'formidable'
// export const userSignupValidator =  (req, res, next)  => {
//     // console.log(req.body)
//     let err = [];
//     let form = new formiable.IncomingForm();
//      form.parse  (req,  (error, fields, files)  => {
//              if (fields.name == "") {
//                 err = [...err, 'name is required']
//             }
//             if (fields.email.match(/.+\@.+\..+/) == null) {
//                 err = [...err, 'Email must contains @']
                
//             } else if (fields.email.length < 4 || fields.email.length > 32) {
//                 err = [...err, 'Email must be between 3 to 32']
               
//             }
//             if (fields.password.match(/\d/) == null) {
//                 err = [...err, 'Password must contain a number']
                
//             } else if (fields.password.length < 6) {
//                 err = [...err, 'Password must contain at least 6 characters']
              
//             } else if (fields.password == "") {
//                 err = [...err, 'Password is required']
//             }
            
//            if (err.length != 0) {
//                 const firstError = err[0]
//                 return res.status(400).json({ error: firstError })
//             }
//         }) 
       
//       next();    
   
// }