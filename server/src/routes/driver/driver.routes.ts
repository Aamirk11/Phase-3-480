import express from 'express'
import { 
    loginDriver,
    updateDriverAddress,
    getAllModels,
    declareDrivableModels
 } from '../../controller/driver.controller/driver.controller';

 const router = express.Router();

 router.post('/auth/login', loginDriver);
//  router.put('/:id/address', updateDriverAddress);
router.put('/:id/address', async (req, res) => {
    await updateDriverAddress(req, res);
  });
 router.get('/models', getAllModels);
 router.post('/:id/models', declareDrivableModels);

 export default router;