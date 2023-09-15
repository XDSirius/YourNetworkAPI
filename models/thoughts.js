const {Schema, model} = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength:280 ,
            minlength:1 ,

        },
        createdAt:{
            type: Date,
            default: Date.now,
            //What is a getter method?
            //Need to format the timestamp on query
            get:timestamp=>timestamp,
        },
        username:{
            type:String,
            required:true,
        },
        reactions:[
            {
               reactionSchema
               
            },
        ],

    }
)
//????????
thoughtSchema
 .virtual('reactionCount').get(function(){return this.reactions.length})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
