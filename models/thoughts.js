const {Schema, model} = require('mongoose');

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
        },
        username:{
            type:String,
            required:true,
        },
        reactions:[
            {
               //array of nested documents created with the reaction schema 
               type: String,
               
            },
        ],

    }
)
//????????
thoughtSchema
 .virtual('reactionCount').get(function(){return this.reactions.length})

const Thought = model('thought', thoughtSchema);
module.exports = thoughtSchema;
