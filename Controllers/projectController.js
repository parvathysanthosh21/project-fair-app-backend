const projects = require('../Models/projectSchema')

// add projects

exports.addProjects = async (req,res)=>{
    console.log("Inside add project function");
    const userId = req.payload
    const projectimage = req.file.filename
    const {title,languages,overview,github,website} = req.body
    // console.log(`${title},${languages},${overview},${github},${website} ${projectimage} ${userId}`);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exists!! upload another")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectimage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(`Request Failed , Error :${err}` )
  
    }
}

// get user projects

exports.allUserProjects = async(req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


// get  all projects

exports.getallProjects = async(req,res)=>{
    try{
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// get  all projects

exports.getHomeProjects = async(req,res)=>{
    try{
        const homeProjects = await projects.find()
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}