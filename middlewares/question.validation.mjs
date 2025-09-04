export const validateCreateQuestionData = (req, res, next) => {
    if (!req.body.title || !req.body.description || !req.body.category) {
        return res.status(400).json({
            message: "Invalid request data."
        })
    }
    next();
}

export const validateSearchQuestionData = (req, res, next) => {
    if (!req.query.title && !req.query.category) {
        return res.status(400).json({
            message: "Invalid search parameters."
        })
    }
    next();
}