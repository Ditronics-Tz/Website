"use server";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  };
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form data
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const company = formData.get("company")?.toString().trim() ?? "";
  const plan = formData.get("plan")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  // Validate
  const errors: ContactFormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!message || message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors,
    };
  }

  // In a real application, you would send an email here
  // using nodemailer, resend, or another email service
  try {
    // Simulate sending email
    console.log("Contact form submission:", {
      name,
      email,
      company,
      plan,
      message,
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, we'll just log and return success
    // In production, implement actual email sending:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New contact from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPlan: ${plan}\n\nMessage:\n${message}`,
    // });

    return {
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
