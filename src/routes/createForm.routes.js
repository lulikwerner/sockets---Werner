import { Router } from 'express';
import createForm from '../../managers/createForm.js';


const router = Router();

router.use('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})


export default router;