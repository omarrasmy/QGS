const sgMail =require('@sendgrid/mail')

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setApiKey('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')

const SendWelcomMessage=(sender,receiver,Frist_Name)=>{

    const mail={
        to:receiver,
        from:sender,
        subject:`welcom ${Frist_Name}`,
        text: `Thank You for joining Quizlii Site ! you can now use your email and pass to use our site  `

    }
    sgMail.send(mail)

}
const CancelationMail=(Email,Frist_Name)=>{
    const mail={
        to:Email,
        from:'radwayasser90@gmail.com',
        subject:`Heyy ${Frist_Name} ! `,
        text:'why u did this .. Give us your feedback'

    }

    sgMail.send(mail)

}
 const SendFeedBack=(sender,recevier,feedback)=>{
 const mail={
     to:recevier,
     from:sender,
     subject:`New feedback From ${sender}`,
     text:feedback
 }


  sgMail.send(mail)
 }
 const Send_Rejection_mail=(sender,recevier)=>{
    const mail={
        to:recevier,
        from:sender,
        subject:`from ${sender} -rejection mail-`,
        text:`sorry ${recevier} , but we think you are not real instructor `
    }
   
   
     sgMail.send(mail)
    }
   



module.exports={
SendWelcomMessage,
CancelationMail,
SendFeedBack,
Send_Rejection_mail
}
