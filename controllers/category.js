import Category from '../models/category';
import formidable from 'formidable';
// import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
    // lay du lieu tu form
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        // console.log(fields)
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
        category.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Add category failed"
                });
            };
            res.json(data)
        });
    });
    // let category = new Category(req.body);

    // console.log(category)
    // category.save((err, data) => {
    //     if (err) {
    //         res.status(400).json({
    //             error: "Add category failed"
    //         });
    //     };
    //     res.json(data)
    // });
    // console.log(category)

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
    console.log(category)
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
//list cate
export const list = (req, res) => {
    Category.find((err, data) => {
        if (err) {
            error: "List not found";

        }
        res.json({ data })
    });

};
/// update cate
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
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
        let category = req.category;
        category = _.assignIn(category, fields)
        category.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "update category failed "
                });

            };
            res.json(data)
        });
    });
    // let category = req.category;
    // category = _.assignIn(category, req.body)
    // category.save((err, data) => {
    //     if (err) {
    //         res.status(400).json({
    //             error: "update category failed "
    //         });

    //     };
    //     res.json(data)
    // });

};

//list cateHomepage
export const cateHome = (req, res) => {
    Category.find((err, data) => {
        if (err) {
            error: "List not found";

        }
        res.json({ data })
    }).limit(4);

};