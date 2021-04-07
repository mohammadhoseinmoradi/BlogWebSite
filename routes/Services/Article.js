const express = require('express')
const User_Information = require('../../Models/User')
const Article_Information = require('../../Models/Article')
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const PhotoArticle = require('../../tools/PhotoArticles/Article')
const AvatarArticle = require('../../tools/GET_Avatar_Article/Avatar')
const AddArticles = (req, res) => {


    let Name_Article = req.body.Article_Name

    Article_Information.find({
        Article_Title: Name_Article.trim()


    }, (err, existUser) => {
        if (err) {


            if (err) return res.status(500).send();
        }
        if (existUser.length != 0) {

            return res.status(500).send();
        }
        let ArticleOwner = req.session.user.User_id
        const New_Article = new Article_Information({
            Article_Title: Name_Article,
            Article_Owner: ArticleOwner
        })
        New_Article.save({}, (err, UserSaved) => {


            if (err) return res.status(500).send();
            req.session.user.Article_Location = UserSaved.Article_File_Location
            req.session.user.Article_Avatar = UserSaved.Article_Avatar
            req.session.user.Article_Id = UserSaved._id

            res.send("User Has Been Created :)")
        })
    })

}
const PersonalArticle = (req, res) => {

}
const UploadPhotos = (req, res) => {

    const upload = PhotoArticle.uploadAvatar.single('upload');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {

            res.status(500).send('Server Error!')
        } else if (err) {

            res.status(404).send(err.message)
        } else {

            let Url = req.file.destination.split('public')
            console.log(Url);
            res.json({ uploaded: 1, url: `${Url[1]}/${req.file.filename}` })

        }
    })

}
const UploadAvatar = (req, res) => {
    const upload = AvatarArticle.uploadAvatar.single('avatar');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            res.status(500).send('Server Error!')
        } else if (err) {
            console.log(err);
            res.status(404).send(err.message)
        } else {

            Article_Information.findByIdAndUpdate(req.session.user.Article_Id, { Article_Avatar: req.file.filename }, { new: true }, (err, user) => {


                if (err) {
                    res.status(500).json({ msg: 'Server Error!' })
                } else {
                    if (req.session.user.Article_Avatar && req.session.user.Article_Avatar !== "Default.png") {


                        fs.unlink(path.join(__dirname, '../../public/images/ArticleAvatar', req.session.user.Article_Avatar), err => {
                            if (err) {
                                res.status(500).json({ msg: err.message })
                            } else {
                                req.session.user.Article_Avatar = req.session.user.Article_Avatar;

                                res.send("ok");
                                // res.status(200)
                            }
                        })

                    } else {
                        req.session.user.Article_Avatar = req.session.user.Article_Avatar;
                        res.send("ok");
                        // res.status(200)
                    }
                }
            });
        }
    })
}
const SubmitArticle = (req, res) => {

    console.log(req.body);
    console.log(typeof(req.body));
    console.log(req.body.length);
    let data = req.body.Data
    let Location = path.join(__dirname, '../../public/ArticlePages');
    let ArticleName = `${req.session.user.User_id}-${req.session.user.Article_Id}-${Date.now()}-Article.html`
    fs.writeFile(`${Location}/${ArticleName}`, ` ${ data }`,
        function(err) {
            if (err) throw err;
            Article_Information.findByIdAndUpdate(req.session.user.Article_Id, {
                $set: {
                    Article_File_Location: `${Location}/${ArticleName}`,
                    Article_Summary: req.body.Text_Summary
                }

            }, { new: true }, (err, user) => {

                if (err) {
                    res.status(500).json({ msg: 'Server Error!' })
                } else {
                    if (req.session.user.Article_File_Location && req.session.user.Article_File_Location !== "default.html") {


                        fs.unlink(path.join(__dirname, '../../public/ArticlePage', req.session.user.Article_File_Location), err => {
                            if (err) {
                                res.status(500).json({ msg: err.message })
                            } else {
                                req.session.user.Article_File_Location = req.session.user.Article_File_Location;

                                res.end()
                            }
                        })

                    } else {
                        req.session.user.Article_File_Location = req.session.user.Article_File_Location;
                        res.end()
                    }
                }
            });
        });
    res.send("OK")
}
module.exports = {
    PersonalArticle,
    AddArticles,
    UploadPhotos,
    SubmitArticle,
    UploadAvatar
}