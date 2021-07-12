const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id...' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId } },
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id...' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId }},
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id...' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports = userController;