type CalculateAge = (dateOfBirth: string) => number

export const calculateAge: CalculateAge = (dateOfBirth) => {
  const dob: any = new Date(dateOfBirth);
  const currentDate: any = new Date();

  // Calculate the difference in milliseconds
  const ageInMilliseconds = currentDate - dob;

  // Convert milliseconds to years
  const ageInYears = new Date(ageInMilliseconds).getFullYear() - 1970;

  return ageInYears;
}
// function calculateAge:CalculateAge(dateOfBirth) {
//   const dob = new Date(dateOfBirth);
//   const currentDate = new Date();

//   // Calculate the difference in milliseconds
//   const ageInMilliseconds = currentDate - dob;

//   // Convert milliseconds to years
//   const ageInYears = new Date(ageInMilliseconds).getFullYear() - 1970;

//   return ageInYears;
// }
