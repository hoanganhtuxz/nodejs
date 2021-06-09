import Contact from '../models/contact';
import formidable from 'formidable';
// import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Add contact failed"
            });
        };
        const { name, content, email, title } = fields;
        if (!name || !content || !email || !title) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };
        let contact = new Contact(fields);
        contact.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Add contact failed"
                });
            };
            res.json(data)
        });
    });

};
/// detail contact
export const contactById = (req, res, next, id) => {
    Contact.findById(id).exec((err, contact) => {
        if (err || !contact) {
            res.status(400).json({
                error: "Can't find the contact"

            });
        }
        req.contact = contact;
        next();
    })
};
export const read = (req, res) => {
    return res.json(req.contact);
};
/// delete contact
export const remove = (req, res) => {
    let contact = req.contact;
    contact.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "can't delete contact"
            });

        }
        res.json({
            data: deleteProduct,
            message: "contact deleted successfully"

        })
    })
};
// list contact
export const list = (req, res) => {
    Contact.find((err, data) => {
        if (err) {
            error: "contact not found";

        }
        res.json({ data })
    });

};
///update contact
// export const update = (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "update contact failed"
//             });
//         };
//         const { name, phone, content, email, title } = fields;
//         if (!name || !content || !phone || !email || !title) {
//             return res.status(400).json({
//                 error: "You have not entered full information"
//             });;
//         };

//         let contact = req.contact;
//         contact = _.assignIn(contact, fields)
//             ///
//         if (files.photo) {
//             if (files.photo.size > 100000) {
//                 res.status(400).json({
//                     error: "You should import photos under 1 mb"
//                 })
//             }
//             contact.photo.data = fs.readFileSync(files.photo.path);
//             contact.photo.contentType = files.photo.path;
//         }
//         contact.save((err, data) => {
//             if (err) {
//                 res.status(400).json({
//                     error: "update contact failed 2"
//                 });
//                 // console.log(err)
//             };
//             res.json(data)
//         });

//     });

// };