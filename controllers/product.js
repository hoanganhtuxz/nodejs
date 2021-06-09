import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
    // lay du lieu tu form
    let form = new formidable.IncomingForm();
    // lay anh 
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        // console.log("err", typeof err)
        if (err) {
            console.log("hello err", err)
            return res.status(400).json({
                error: "Add product failed"
            });
        };
        const { name, category, price, description } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };
        if (category == 0) {
            return res.status(400).json({
                error: "category is not defined"
            });;
        }

        let product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                res.status(400).json({
                    error: "You should import photos under 1 mb"
                })
            }
            // doc file anh
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.path;
        } else {
            return res.status(400).json({
                error: "image undefind"
            })
        }
        product.save((err, data) => {
            if (err) {
                console.log(err)
                res.status(400).json({
                    error: "Add product faileds"
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
    Product.find((err, datas) => {
        if (err) {
            error: "Product not found";

        }
        let data = datas.map(item => {
            return {
                _id: item._id,
                name: item.name,
                description: item.description,
                category: item.category,
                price: item.price,
            }
        })
        res.json({ data })
        // console.log("productdata", data)
    });

};
///update product
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "update product failed."
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
            if (files.photo.size > 1000000) {
                res.status(400).json({
                    error: "You should import photos under 1 mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            //
            product.photo.contentType = files.photo.path;
        }
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "update product failed"
                });
                // console.log(err)
            };
            res.json(data)
        });

    });

};
/// image
export const image = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
};
// product home
export const prHome = (req, res) => {
    Product.find((err, datas) => {
        if (err) {
            error: "Product not found";

        }
        let data = datas.map(item => {
            return {
                _id: item._id,
                name: item.name,
                description: item.description,
                category: item.category,
                price: item.price,
            }
        })
        res.json({ data })
    }).limit(8);

};
export const prblog = (req, res) => {
    Product.find((err, datas) => {
        if (err) {
            error: "Product not found";

        }
        let data = datas.map(item => {
            return {
                _id: item._id,
                name: item.name,
                description: item.description,
                category: item.category,
                price: item.price,
            }
        })
        res.json({ data })
    }).limit(8);

};