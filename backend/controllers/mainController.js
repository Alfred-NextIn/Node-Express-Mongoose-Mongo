import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';


//@desc   GET goals
//@route  api/goals
//access  PRIVATE
export const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id});

    res.status(200).json(goals);
})

//@desc   GET goal
//@route  api/goals/:id
//access  PRIVATE
export const getGoal = asyncHandler( async (req,res) => {
    res.status(200).json({msg: "Get goal"});
})

//@desc   POST goal
//@route  api/goals
//access  PRIVATE
export const setGoal = async (req,res,next) => {
    if(!req.body.goal) {
        const error =  new Error("Please provide a goal");
        error.status = 404;

        return next(error);
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.goal
    })
    res.status(201).json(goal);
    
}


//@desc   PUT goals
//@route  api/goals/:id
//access  PRIVATE
export const updateGoal = async (req,res) => {
    const id = req.params.id;

    const goal = await Goal.findById(id);

    const user = await User.findById(req.user.id);

    if(!goal)
    {
        res.status(400)
        throw new Error("Goal Not Set");
    }

    if(goal.user.toString() != user.id)
    {
        res.status(401)
        throw new Error("You cannot update a goal that is not yours");
    }


    const updatedGoal = await Goal.findByIdAndUpdate(id, { text: req.body.goal}, {
        new: true
    })

    res.status(200).json(updatedGoal);
}

//@desc   DELETE goal
//@route  api/goals/:id
//access  PRIVATE
export const deleteGoal = async (req,res) => {
    const id = req.params.id;

    const goal = await Goal.findById(id);

    if(!goal)
    {
        res.status(400);
        throw new Error(`Goal with id: ${id} not found`);
    }

    const user = await User.findById(req.user.id);

    if(goal.user.toString() != user.id)
    {
        res.status(401)
        throw new Error("You cannot delete a goal that is not yours");
    }

    await goal.deleteOne();
    res.status(200).json({id: id});
}

