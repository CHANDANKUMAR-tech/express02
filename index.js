import express from 'express'
const app = express()
const port = 3040
app.use(express.json())
/*app.get("/",(req,res)=>
{
    res.send("hello sparsha ")
})
app.get("/ck",(req,res)=>
{
    res.send("hello chandan ")
})
app.get("/pri",(req,res)=>
{
    res.send("hello priyanka")
})*/
let teadata=[]
let id=1
app.post("/teas",(req,res)=>
{
 const {name,price}=req.body
 const newteadata={id:id++,name,price}
 teadata.push(newteadata)
 res.status(201).send(newteadata)
})
app.get("/teas",(req,res)=>{
    res.status(200).send(teadata)
})
app.get("/teas/:id",(req,res)=>{
   const tea = teadata.find(t=>t.id === parseInt(req.params.id)) //as in url all are string
   if(!tea)
    {
        res.status(404).send('error not found');
        
    } 
    res.status(200).send(tea)
})
// updation
app.put("/teas/:id",(req,res)=>{
  const tea = teadata.find(t => t.id === parseInt(req.params.id))
  if(!tea)
  {
    res.status(404).send('error found')
  }
  const {name,price}=req.body
  tea.name=name
  tea.price=price
  res.status(200).send(tea)
})
app.delete("/teas/:id",(req,res)=>
{
    const teaindex=teadata.findIndex(t=>t.id === parseInt(req.params.id))
    if(teaindex === -1)
    {
        res.status(404).send('error found')
    }
    teadata.splice(teaindex,1)
    res.status(204).send('deleted')
})
app.listen(port,()=>
{
    console.log(`server is running :${port}...`)
})