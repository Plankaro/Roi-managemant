/* eslint-disable @typescript-eslint/no-explicit-any */


// Dynamically import xlsx so it only loads on the client side
import XLSX from 'xlsx';

function ExcelUploader() {
  const handleFile = async (e:any) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />
    </div>
  );
}

export default ExcelUploader;
