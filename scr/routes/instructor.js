const express = require('express')
const Auth=require('../middleware/Auth')
const instructorController=require('../Controllers/instructor')
const router = new express.Router()


// send Account request 
router.post('/',instructorController.Send_SingnUp_Request)

//Login 
router.post('/instructor/login',instructorController.Login)  

//upload resources
router.post('/upload/resources',Auth.Auth,instructorController.resource.single('resource'),instructorController.enterResources)


//upload image
router.post('/upload/profilePicture',Auth.Auth,instructorController.image.single('image'),instructorController.UploadProfilePicture)

// read his profile
router.get('/instructor/me',Auth.Auth,instructorController.ReadProfile)

// Delete  his own account 
 router.delete('/instructor/delete',Auth.Auth,instructorController.deleteAccount)

 //send feedback to Admin -done look at feedback route-

 //logout 
 router.post('/instructor/logout',Auth.Auth,instructorController.Logout)

 //logout from all devices
  router.post('/instructor/logoutfromall',Auth.Auth,instructorController.logoutFromAllDevices)

  //fetch pic on web 
router.get('/instructor/:id/pic',instructorController.fetcProfilePicture)

router.patch('/instructor/editme:password',Auth.Auth,instructorController.editInstructorProfile)





 


module.exports=router

