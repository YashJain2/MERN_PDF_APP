const Pdf = require("../Models/PdfModel");

module.exports.UploadPdf = async (req, res,next) => {
    try {
      const { originalname, buffer } = req.file;
      const { token, email } = req.user;
  
      const pdf = new Pdf({
        filename: originalname,
        pdfData: buffer,
        token: token,
        userEmail: email
      });
  
      await pdf.save();
  
      res.json({ message: 'File uploaded successfully' });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error uploading the PDF file' });
    }
  };

  module.exports.FetchPdf = async (req, res) => {
    try {
      const { token } = req.user;
  
      const pdf = await Pdf.findOne({ token });
  
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found' });
      }
  
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', `attachment; filename="${pdf.filename}"`);
      res.send(pdf.pdfData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching the PDF file' });
    }
  }