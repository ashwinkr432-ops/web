const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/");

const Book=mongoose.model('Book',{
    title: String,
    author: String,
    status: {default:'Available', type: String}
});

app.post('/books',async(req,res)=>{
    const book= await Book.create(req.body);
    res.json(book);
});

app.get('/books',async(req,res)=>{
    res.json(await Book.find());
});

app.put('/books/:id',async(req,res)=>{
    const book=await Book.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        author:req.body.author
    });
    res.json(book);
});

app.delete('/books/:id',async(req,res)=>{
    await Book.findByIdAndDelete(req.params.id);
    res.send('deleted');
});

app.listen(3000,() => console.log('connected successfully'));