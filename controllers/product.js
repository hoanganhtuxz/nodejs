import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Add product failed"
            });
        };
        const { name, price, description } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };
        let product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "You should import photos under 1 mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Add product failed"
                });
            };
            res.json(data)
        });
    });

};
/// detail product
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Can't find the product"

            });
        }
        req.product = product;
        next();
    })
};
export const read = (req, res) => {
    return res.json(req.product);
};
/// delete product
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "can't delete product"
            });

        }
        res.json({
            data: deleteProduct,
            message: "product deleted successfully"

        })
    })
};
// list product
export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            error: "Product not found";

        }
        res.json({ data })
    });

};
///update product
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "update product failed"
            });
        };
        const { name, price, description } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };

        let product = req.product;
        product = _.assignIn(product, fields)
            ///
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "You should import photos under 1 mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "update product failed 2"
                });
                // console.log(err)
            };
            res.json(data)
        });

    });

};