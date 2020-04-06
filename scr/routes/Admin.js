const express=require('express')
const AdminAuth=require('../middleware/Auth')
const AdminController=require('../Controllers/admin')

const router= new express.Router()

//create Admin once 
router.post('/Admin/signUp',AdminController.SingUp )

//Delete instructor
router.delete('/instructor/delete/:id',AdminAuth.AdminAuth,AdminController.DeleteInstructorAccount)

//Login
router.post('/Login',AdminController.Login)

//Logout
router.post('/admin/logout',AdminAuth.AdminAuth,AdminController.LogOut)

//Logout from All Devices 
router.post('/admin/logoutAll',AdminAuth.AdminAuth,AdminController.LogOutFromAllDevices)

//edit his own profile 
router.patch('/admin/me',AdminAuth.AdminAuth,AdminController.editAdminProfile)

// Show Sign up requests
router.get('/admin/singuprequests',AdminAuth.AdminAuth,AdminController.List_signUp_Requests)

//select request
router.get('/admin/singuprequests/:id',AdminAuth.AdminAuth,AdminController.Select_SingUp_Request)

//add instructor or Accept SingUp Request
router.post('/admin/singuprequests/:id/accept',AdminAuth.AdminAuth,AdminController.Add_instructor)

// reject instructor request
router.post('/admin/singuprequests/:id/reject',AdminAuth.AdminAuth,AdminController.Reject_instructor_request)

//send mail when adding new domain (pending) -push notification service-

//edit QB(pending)



module.exports=router
