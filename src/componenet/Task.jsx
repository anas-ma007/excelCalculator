import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';

const Task = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
    // Write to Excel sheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([{ num1, num2, result: sum }]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'result.xlsx');
  };

  const handlePrint = () => {
    // Read result from Excel sheet and print as PDF
    const wb = XLSX.readFile('result.xlsx');
    const ws = wb.Sheets['Sheet1'];
    const data = XLSX.utils.sheet_to_json(ws);
    const pdfContent = `<h1>Result: ${data[0].result}</h1>`;
    html2pdf().from(pdfContent).save('result.pdf');
  };

  return (
    <div>
      <h1>Excel Calculator</h1>
      <form>
        <label>
          Number 1:
          <input style={{margin:10, height: 30}}  type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
        </label>
        <br />
        <label>
          Number 2:
          <input style={{margin:10,  height: 30}}  type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
        </label>
        <br />
        <button style={{margin:10}} type="button" onClick={handleCalculate}>
          Calculate to Excel
        </button>
        {result && <p>Result: {result}</p>}
        <br />
        <button style={{margin:10}}  type="button" onClick={handlePrint}>
          Print as PDF
        </button>
      </form>
    </div>
  );
};

export default Task;
