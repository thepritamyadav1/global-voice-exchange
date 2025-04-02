
const downloadReport = (feedbackData: any[], brandName: string = "GlobalVoice") => {
  // Create a CSV string
  const headers = ["Product", "User", "Age", "Gender", "Location", "Rating", "Date", "Feedback"];
  const csvRows = [headers];
  
  // Add each feedback item as a row
  feedbackData.forEach(item => {
    const row = [
      item.product,
      item.user,
      item.age,
      item.gender,
      item.location,
      item.rating,
      item.date,
      // Escape quotes in the feedback text
      `"${item.feedback.replace(/"/g, '""')}"`
    ];
    csvRows.push(row);
  });
  
  // Convert rows to CSV format
  const csvString = csvRows.map(row => row.join(',')).join('\n');
  
  // Create a Blob with the CSV content
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger download
  const today = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${brandName}_Feedback_Report_${today}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadReport;
