const express=require('express')
const router=new express.Router()

const Auth=require('../middleware/Auth')
const QuestionController=require('../Controllers/Question')


// Add Question Manually
router.post('/question/add/:kind',Auth.Auth,QuestionController.Add_Question_Manually)

//Delete Question
router.delete('/Question/delete/:id',Auth.Auth,QuestionController.DeleteQuestion)

//Edit Question
router.patch('/question/edit/:id',Auth.Auth,QuestionController.EditQuestion)
//List Question
router.get('/question/List',Auth.Auth,QuestionController.List_Questions)

//get QB
router.get('/questionbank/:domain_id',Auth.Auth,QuestionController.get_question_bank)

//add questions to QB
router.post('/questionbank/add',Auth.Auth,QuestionController.Add_Questions_to_QB)

//select question from question bank

router.get('/questionbank/:domain_id/:id',Auth.Auth,QuestionController.select_Question_from_QuestionBank)

module.exports=router