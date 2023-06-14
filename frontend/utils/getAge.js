export function getAge(dateString) {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    month += 12;
  }

  if (age == 0) {
    return `${month} luni`;
  }

  if (age == 1) {
    return "1 an";
  }

  return `${age} ani`;
}