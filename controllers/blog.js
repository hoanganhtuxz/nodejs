import Blog from '../models/blog';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Add blog failed"
            });
        };
        const { title, description } = fields;
        if (!title || !description) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };
        let blog = new Blog(fields);

        if (files.photo) {
            if (files.photo.size > 10000000) {
                res.status(400).json({
                    error: "You should import photos under 1 mb"
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.path;
        } else {
            return res.status(400).json({
                error: "image undefind"
            })
        }
        blog.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Add blog failed"
                });
            };
            res.json(data)
        });
    });

};
/// detail blog
export const blogById = (req, res, next, id) => {
    Blog.findById(id).exec((err, blog) => {
        if (err || !blog) {
            res.status(400).json({
                error: "Can't find the blog"

            });
        }
        req.blog = blog;
        next();
    })
};
export const read = (req, res) => {
    return res.json(req.blog);
};
/// delete blog
export const remove = (req, res) => {
    let blog = req.blog;
    blog.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "can't delete blog"
            });

        }
        res.json({
            data: deleteProduct,
            message: "blog deleted successfully"

        })
    })
};
// list blog
export const list = (req, res) => {
    Blog.find((err, datas) => {
        if (err) {
            error: "blog not found";

        }
        let data = datas.map(item => {
            return {
                _id: item._id,
                title: item.title,
                description: item.description,
                createdAt: item.createdAt
            }
        })
        res.json({ data })
    });

};
///update blog
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "update blog failed"
            });
        };
        const { title, description } = fields;
        if (!title || !description) {
            return res.status(400).json({
                error: "You have not entered full information"
            });;
        };

        let blog = req.blog;
        blog = _.assignIn(blog, fields)
        ///
        if (files.photo) {
            if (files.photo.size > 10000000) {
                res.status(400).json({
                    error: "You should import photos under 1 mb"
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.path;
        }
        blog.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "update blog failed 2"
                });
                // console.log(err)
            };
            res.json(data)
        });

    });

};

/// image
export const image = (req, res, next) => {
    if (req.blog.photo.data) {
        res.set("Content-type", req.blog.photo.contentType);
        return res.send(req.blog.photo.data)
    }
    next();
};
//blog homeage
export const blogHome = (req, res) => {
    Blog.find((err, datas) => {
        if (err) {
            error: "blog not found";

        }
        let data = datas.map(item => {
            return {
                _id: item._id,
                title: item.title,
                description: item.description,
                createdAt: item.createdAt
            }
        })
        res.json({ data })
    }).limit(3);

};