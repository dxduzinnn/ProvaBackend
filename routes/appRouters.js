const express = require('express');
const router = express.Router();
const controller = require('../controllers/appControllers');
router.post('/', controller.createTeacher);
router.get('/', controller.listTeachers);
router.get('/departamento/:departamento', controller.listByDepartment);
router.get('/:id', controller.getTeachersById);
router.get('/:id/turmas', controller.listClasses);
router.put('/:id', controller.updateTeacher);
router.post('/:id/turmas', controller.addClass);
router.delete('/:id', controller.removeTeacher);

module.exports = router;