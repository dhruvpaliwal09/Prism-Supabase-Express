const express = require('express');
const app = express();
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json())


//getmovie
app.get('/movie',async (req, res)=> {
    try {
        const movies = await prisma.movie.findMany();
        res.status(201.).json(movies);
        
    } catch (error) {
        console.log(error);
        res.status(404).json("Not Found")
    }
})

//createmovie
app.post('/movie',async(req,res)=>{
    try {
        const new_movie=await prisma.movie.create({data:req.body});
    res.json(new_movie);
    } catch (error) {
        console.log(error);
    }
    
})

//get review
app.get('/review',async (req, res)=> {
    try {
        const review = await prisma.rating.findMany();
        res.status(201.).json(review);
        
    } catch (error) {
        console.log(error);
        res.status(404).json("Not Found")
    }
})
  

//create review
app.post('/review',async(req,res)=>{
    try {
        const new_review=await prisma.rating.create({data:req.body});
res.send(new_review);
    } catch (error) {
        console.log(error);
    }

})

//update movie
app.patch('/movie/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const movieupdate = await prisma.movie.update({
            where:{Movie_id: parseInt(id)},
            data:req.body
        });
        res.send(movieupdate);
    }
    catch(e){
        console.log(e);
        res.send('error at server end');
    }
})

//delete movie
app.delete('/movie/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.movie.delete({
        where: { Movie_id: id },
      });
      res.status(201).send('done');
    } catch (error) {
      console.log(error);
      res.send('error occured')
    }
  });


//delete review
app.delete('/review/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.rating.delete({
        where: { Rating_id: id },
      });
      res.status(201).send('yess');
    } catch (error) {
      console.log(error);
      res.send('error occured')
    }
  });

//update review
app.patch('/review/:id',async(req, res)=>{
    const id=req.params.id;
    try{
        const reviewupdate = await prisma.rating.update({
            where:{Rating_id: parseInt(id)},
            data:req.body
        });
        res.send(reviewupdate);
    }
    catch(e){
        console.log(e);
        res.send('error at server end');
    }
})

app.listen(5000);

