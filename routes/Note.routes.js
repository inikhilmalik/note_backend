const express=require("express");
const {NoteModel}=require("../models/Note.model")

const noteRouter=express.Router();

noteRouter.post("/create",async(req,res)=>{
    try{
        const note=new NoteModel(req.body);
        await note.save();
        res.send({"msg":"note is added"})
    }catch(err){
        res.send({"err":err.message})
    }
})

noteRouter.get("/",async(req,res)=>{
    console.log("rr",req.body)
    try{
        const note=await NoteModel.find({authorID:req.body.authorID});
        res.send(note)
    }catch(err){
        res.send({"err":err.message})
    }
})
noteRouter.get("/:noteID",async(req,res)=>{
    console.log(req.body)
    const {noteID}=req.params;
    const note=await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.authorID!=note.authorID)
        {
            res.send({"msg":"You are not authorized to do this action"})
        }
        else{
            const note=await NoteModel.findOne({_id:noteID});
            res.send(note)
        }
    }catch(err){
        res.send({"err":err.message})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params;
    const note=await NoteModel.findOne({_id:noteID})
    console.log(note)
    try{
        if(req.body.authorID!=note.authorID)
        {
            res.send({"msg":"You are not authorized to do this action"})
        }
        else
        {
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body);
            res.send({"msg":`note is updated with id ${noteID} and author name ${note.author}`})
        }
    }catch(err){
        res.send({"err":err.message})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params;
    const note=await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.authorID!=note.authorID)
        {
            res.send({"msg":"You are not authorized to do this action"})
        }
        else
        {
            await NoteModel.findByIdAndDelete({_id:noteID});
            res.send({"msg":"note is delete"})
        }
    }catch(err){
        res.send({"err":err.message})
    }
})

module.exports={noteRouter}
