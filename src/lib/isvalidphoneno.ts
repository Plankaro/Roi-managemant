export const isValidPhoneNumber = (phone: string) => {
    // Optional plus, followed by 11 to 15 digits.
    // This ensures that numbers like "9395631137" (10 digits) fail,
    // while "+919395631137" or "919395631137" (12 digits) pass.
    const phoneRegex = /^(?:\+?\d{11,15})$/;
    return phoneRegex.test(phone);
  };
  