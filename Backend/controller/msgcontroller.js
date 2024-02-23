const messageModel = require("../model/msgModel");

module.exports.addMessage = async(req,res,next)=>{
try{
 const {from,to,message}= req.body;
 const data = await messageModel.create({
    message:{text:message},
    users:[from,to],
    sender:from,

 })
 if(data)return res.json({msg:"message added successfully"});
 return res.json({msg:'message failed'});
}
catch(err){
    next(err)
}
};

module.exports.getAllMessage = async(req,res,next)=>{
 try{
//    const {from,to} = req.body;
//    const messages = await messageModel.find({
//     users:{
//         $all:[from,to],
//     },
//    }).sort({updatedAt:1});
//    const projectMessages = messages.map((msg)=>{
//     return{
//         fromSelf: msg.sender.toString() === from,
//         message:msg.message.text,
//     }
//    })
//    res.json(projectMessages);

const { from, to } = req.body;

    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };

    });
    res.json(projectedMessages);
 }
 catch(e){
    next(e);
 }


};
