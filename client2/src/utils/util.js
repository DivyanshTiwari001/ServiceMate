export const getFormattedDateTime = () => {
  const now = new Date();
  // Format date
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = now.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Format time
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  return { date: formattedDate, time: formattedTime };
}