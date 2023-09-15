const { ObjectId } =require ('mongoose').Types;
const {User, Thought} = require('../models');


const allUsers = async () => {
    const numberofUsers = await User.aggregate().count('userCount');
    return numberofUsers;
}

module.exports={

//Get ALL users
async getUsers(req,res){
    try{
        const users = await User.find();
        const userObj = {
            users,
            allUsers:await allUsers(),
        };
        res.json(userObj)
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

//Get User By ID 

async getSingleUser(req,res){
    try {
        const user = await User.findOne({_id:req.params.userId}).select('-_ _v');
        if(!user){ return res.status(404).json({message: 'No User with that Id'});
    };
    res.json({user});
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
        }
        
    },

//Post New User
async createUser(req,res){
    try{
        const user = await User.create(req.body);
        res.json(user);
    }catch(err){
        res.status(500).json(err);
    }
},

//Update user by id
async updateUser(req,res){
    try{
        const user = await User.findOneAndUpdate(

            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
    
        );
        if (!course){
            res.status(404).json({message: 'No User with this ID'});
        }
        res.json(user);
    } catch(err){
        res.status(500).json(err);
    }
},

//Delete user by id
async deleteUser(req,res){
    try{
        const user = await User.findOneAndRemove({ _id: req.params.userId});
        if(!user){
            return res.status(404).json({message:'No user with that Id'});
        }
        res.json({message: 'User deleted'});
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
},


//BONUS remove a user's associated thoughts when deleted



//Friends??????
};