const Admin = require('../../models/admin');
const User = require('../../models/user');
const jwtHelper = require('../../helpers/jwtHelpers');
const adminHelper = require('../../helpers/adminHelper');
const createAdmin = (req, res) => {
    Admin.create(req.body).then((result) => res.status(200).end())
        .catch(err => {
            err.code == 11000 ? res.status(500).json({ error: "Failed, Duplicated username." }) :
                res.status(500).json({ error: "Failed." });
            console.error(`🔴 ${err.message} `);
        });
}

const readAllAdmins = (req, res) => {
    Admin.find().then(result => res.json(result)).catch(err => {
        console.error(`🔴 ${err.message} `);
        res.status(500).json({ msg: "Failed." });
    });
}

const readUser = (req, res) => {
    User.findById(req.userID).populate({ path: 'roleIds', select: 'title ',populate:[{path: 'pageIds', select: 'name path icon class'}]})
    .then(result => result ? res.json(result) : res.status(404))
        .catch(err => {
            console.log(`🔴 ${err.message}`);
            res.status(500).json({ msg: "Failed." });
        });
}

const removeAdmin = (req, res) => {
    Admin.deleteOne({ _id: req.params.id }).then(result => res.status(200).end())
        .catch(err => {
            console.log(`🔴 ${err.message}`);
            res.status(500).json({ msg: "Failed." });
        });
}

const login = async (req, res) => {    
    console.log(req.body)
    User.findOne({ username: req.body.username }).populate({ path: 'roleIds', select: 'title ',populate:[{path: 'pageIds', select: 'name path icon class order'}]})
    .then(async (adminInstance) => {
        try {
            console.log(adminInstance);
            if (adminInstance && await adminInstance.isValidPassword(req.body.password)) {
                const payload = { userID: adminInstance.id }
                const accessToken = jwtHelper.generateAccessToken(payload);
                const authorizedPages = adminHelper.getUserAuthorizedPages(adminInstance)
                const isSuperAdmin = adminInstance.roleIds.some(obj => obj.title === 'Super Admin');
                return res.json({ accessToken: accessToken,pages:authorizedPages,isSuperAdmin:isSuperAdmin});
            } else return res.status(401).json({ msg: "Invalid username or password" })
        } catch (err) {
            return res.status(401).json({ msg: "Invalid username or password" })
        }
    }).catch(err => res.status(401).json({ msg: "Request failed, Contact Administrator." }));
}

const info = (req, res) => {
    User.findById(req.userID).select('username').then(result => result ? res.json(result) : res.status(404).end())
        .catch(() => res.status(500).end())
}
const userRoles =(req,res) => {
    User.findById(req.userID).select('roleIds').then(result => result ? res.json(result) : res.status(404).end())
    .catch(() => res.status(500).end());
}
const userPages =(req,res) => {
    User.findById(req.userID).populate({ path: 'roleIds', select: 'title ',populate:[{path: 'pageIds', select: 'name path icon class'}]})
    .then((user) =>{
        const pages = adminHelper.getUserAuthorizedPages(user);
        return res.json(pages);
    })
    .catch(() => res.status(500).end());
}

module.exports = { login, info, createAdmin, readAllAdmins, readUser, removeAdmin ,userRoles,userPages}