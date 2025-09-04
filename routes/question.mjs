import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateQuestionData, validateSearchQuestionData } from "../middlewares/question.validation.mjs";
import { validateCreateAnswerData } from "../middlewares/answer.validation.mjs";

const questionRouter = Router();

questionRouter.post("/", [validateCreateQuestionData], async (req,res) => {
    const newQuestion = {...req.body};
    try {
        await connectionPool.query(`
            insert into questions (title, description, category)
            values ($1, $2, $3)`,
        [
            newQuestion.title,
            newQuestion.description,
            newQuestion.category
        ]);
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            message: "Unable to create questions",
            error: error.message
        });
    }
    return res.status(201).json({
        message: "Question created successfully."
    });
});

questionRouter.get("/", [validateSearchQuestionData], async (req,res) => {
    const title = req.query.title;
    const category = req.query.category;
    
    let result;
    try {
        result = await connectionPool.query(`
            select * from questions
            where
                (title = $1 or $1 is null or $1 = '')
                and
                (category = $2 or $2 is null or $2 = '');`
            ,[title,category]);
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            message: "Unable to fetch questions.",
            error: error.message
        });
    }
    return res.status(200).json({
        data: result.rows
    });
});

questionRouter.get("/:questionId", async (req,res) => {
    const questionIdFromClient = req.params.questionId;
    let result;
    try {
        result = await connectionPool.query("select * from questions where id = $1",[questionIdFromClient])
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            message: "Unable to fetch questions.",
            error: error.message
        });
    }
    if (!result.rows[0]) {
        return res.status(404).json({
            message: "Question not found."
        });
    }
    return res.status(200).json({
        data: result.rows[0]
    });
});

questionRouter.put("/:questionId", [validateCreateQuestionData], async (req,res) => {
    const questionIdFromClient = req.params.questionId;
    const newQuestion = {...req.body};
    try {
        const result = await connectionPool.query("select * from questions where id = $1",[questionIdFromClient]);
        if (!result.rows[0]) {
            return res.status(404).json({
                message: "Question not found."
            });
        }
        
        await connectionPool.query(`
            update questions
            set title = $1,
                description = $2,
                category = $3
            where id = $4`,
        [
            newQuestion.title,
            newQuestion.description,
            newQuestion.category,
            questionIdFromClient
        ]);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch questions.",
            error: error.message
        });
    }
    
    return res.status(200).json({
        message: "Question updated successfully."
    });
});

questionRouter.delete("/:questionId", async (req,res) => {
    const questionIdFromClient = req.params.questionId;
    try {
        const result = await connectionPool.query("select * from questions where id = $1",[questionIdFromClient]);
        if (!result.rows[0]) {
            return res.status(404).json({
                message: "Question not found."
            });
        }
        await connectionPool.query(`delete from questions where id = $1`,[questionIdFromClient]);
        await connectionPool.query(`delete from answers where question_id = $1`,[questionIdFromClient]);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch questions.",
            error: error.message
        });
    }
    
    return res.status(200).json({
        message: "Question deleted successfully."
    });
});

questionRouter.post("/:questionId/answers", [validateCreateAnswerData], async (req,res) => {
    const newAnswer = {...req.body};
    const questionIdFromClient = req.params.questionId;
    try {
        const result = await connectionPool.query("select * from questions where id = $1",[questionIdFromClient]);
        if (!result.rows[0]) {
            return res.status(404).json({
                message: "Question not found."
            });
        }

        await connectionPool.query(`insert into answers (content, question_id) values ($1, $2)`,
            [newAnswer.content, questionIdFromClient]);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create answers",
            error: error.message
        });
    }
    return res.status(201).json({
        message: "Answer created successfully."
    });
});

questionRouter.get("/:questionId/answers", async (req,res) => {
    const questionIdFromClient = req.params.questionId;
    let result;
    try {
        result = await connectionPool.query("select id, content from answers where question_id = $1",[questionIdFromClient])
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            message: "Unable to fetch questions.",
            error: error.message
        });
    }
    if (!result.rows[0]) {
        return res.status(404).json({
            message: "Question not found."
        });
    }
    return res.status(200).json({
        data: result.rows
    });
});

questionRouter.delete("/:questionId/answers", async (req,res) => {
    const questionIdFromClient = req.params.questionId;
    try {
        const result = await connectionPool.query("select * from questions where id = $1",[questionIdFromClient]);
        if (!result.rows[0]) {
            return res.status(404).json({
                message: "Question not found."
            });
        }
        await connectionPool.query(`delete from answers where question_id = $1`,[questionIdFromClient]);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch questions.",
            error: error.message
        });
    }
    
    return res.status(200).json({
        message: "All answers for the question have been deleted successfully."
    });
});

export default questionRouter;