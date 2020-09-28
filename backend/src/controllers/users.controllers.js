const userCtrl = {};

const User = require('../models/User');

//Obtener usuarios
userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

//Crear usuario
userCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json('User Created');
}

//Borrar usuario
userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json('Usuario eliminado');
}

module.exports = userCtrl;