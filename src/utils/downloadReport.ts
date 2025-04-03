
interface ReportItem {
  product: string;
  user: string;
  age?: number | string;
  gender?: string;
  location?: string;
  rating: number;
  date: string;
  feedback: string;
  videoUrl?: string;
}

const downloadReport = (feedbackData: ReportItem[], brandName: string = "GlobalVoice") => {
  if (!feedbackData || feedbackData.length === 0) {
    console.error("No data to download");
    return;
  }
  
  // Create a CSV string
  const headers = ["Product", "User", "Age", "Gender", "Location", "Rating", "Date", "Feedback"];
  const csvRows = [headers];
  
  // Add each feedback item as a row
  feedbackData.forEach(item => {
    const row = [
      item.product,
      item.user || "Anonymous",
      (item.age || "Not specified").toString(),
      item.gender || "Not specified",
      item.location || "Not specified",
      item.rating.toString(), // Convert number to string
      item.date,
      // Escape quotes in the feedback text
      `"${item.feedback?.replace(/"/g, '""') || "No feedback provided"}"`
    ];
    csvRows.push(row);
  });
  
  // Convert rows to CSV format - ensure all values are strings
  const csvString = csvRows.map(row => row.map(value => String(value)).join(',')).join('\n');
  
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
