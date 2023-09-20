const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const allThoughts = async () => {
  const numberOfThoughts = await Thought.aggregate().count("thoughtCount");
  return numberOfThoughts;
};

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
        allThoughts: await allThoughts(),
      };
      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //Get thoughts by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("_ _v");
      if (!User) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID " });
      }
      res.json({ thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //Create new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      //how to push thoughts to the associated user thoughts
    }
  },

  //Update a thought through its id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with this ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete thought by Id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought found with ID" });
      }
      res.json({ message: "Thought Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // api/thoughts/:thoughtId/reactions ????????????????????
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$addToSet:
          {reactions:
            {reactionBody:req.body.reactionBody,username:req.body.username},},},{runValidators:true,new:true});
      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},{$pull:{reactionId:req.params.reactionId}},{new:true});
      res.json(reaction,{ message: "Reaction Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
