export const validateCreateAnswerData = (req, res, next) => {
    if (!req.body.content || req.body.content.length > 100) {
        return res.status(400).json({
            message: "Invalid request data."
        })
    }
    next();
}