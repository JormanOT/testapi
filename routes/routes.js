import Express from "express";
const router = Express.Router();
import Upload from "../controller/upload.controller.js";


// Upload api/v1/upload - post
router.post('/api/v1/upload/', Upload.uploadDocument)
router.get('/api/v1/upload/', Upload.getDocuments);


router.get('/*', (req, res) => {
    res.send('No hay nada :(');
});


export default router;