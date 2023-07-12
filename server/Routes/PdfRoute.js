const multer = require('multer');
const { UploadPdf,FetchPdf } = require('../Controllers/PdfController')
const { validateToken } = require('../Middlewares/ValidateToken')
const router = require('express').Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-pdf', validateToken, upload.single('pdf'), UploadPdf)
router.get('/fetch-pdf', validateToken, FetchPdf)

module.exports = router