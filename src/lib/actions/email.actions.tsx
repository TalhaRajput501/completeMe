'use server'
import ThankYouEmail from "@/components/ui/ThankYouEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendThankYouMail = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // ! You should have domain verified in resend to use your own email address
      to: 'talhaashfaq4197@gmail.com', // ! You can not send email to anyone without verifying the email address in resend. 
      subject: 'Thank you for your order!',
      react: <ThankYouEmail />,
    })

    if (error) {
      console.error("Error during sending thankyou mail: ", error)
      return { error }
    }

    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error("Error during sending thankyou mail: ", error) 
  }
}