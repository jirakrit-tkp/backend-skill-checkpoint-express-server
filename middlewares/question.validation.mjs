export const validateCreateQuestionData = (req, res, next) => {
    if (!req.body.title || !req.body.description || !req.body.category) {
        return res.status(400).json({
            message: "Invalid request data."
        })
    }
    next();
}

export function validateSearchQuestionData(req, res, next) {
    const { title, category, ...rest } = req.query;
  
    // ❌ ถ้ามี query parameter อื่นที่ไม่ใช่ title/category
    if (Object.keys(rest).length > 0) {
      return res.status(400).json({
        message: "Invalid search parameters."
      });
    }
  
    // ❌ type ต้องเป็น string เท่านั้น
    if ((title && typeof title !== "string") || (category && typeof category !== "string")) {
      return res.status(400).json({
        message: "Invalid search parameters."
      });
    }
  
    // ✅ ผ่าน
    next();
  }