import Category from '../models/category';
import formidable from 'formidable';
import fs from 'fs';
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Add category failed"
            });
        };
        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };
        let category = new Category(fields);
        ///
        category.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Add category failed"
                });
            };
            res.json(data)
        });
        console.log(category)
    });

};
// detail category
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Can't find the category"

            });
        }
        req.category = category;
        next();
    })
};
export const read = (req, res) => {
    return res.json(req.category);
};
/// delete cate
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                error: "can't delete Category"
            });

        }
        res.json({
            data: deleteCategory,
            message: "Category deleted successfully"

        })
    })
};