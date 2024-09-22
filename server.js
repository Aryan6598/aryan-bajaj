const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Set up file handling using Multer
const upload = multer();

// POST Endpoint
app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data } = req.body; // Removed file_b64 as it's not used
    const file = req.file;

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    // File validation
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKB = 0;

    if (file) {
        fileValid = true;
        fileMimeType = file.mimetype;
        fileSizeKB = file.size / 1024; // Convert bytes to KB
    }

    // Prepare response
    const response = {
        is_success: true,
        user_id: 'your_name_ddmmyyyy', // Replace with your ID
        email: 'your_email@college.com', // Replace with your email
        roll_number: 'your_roll_number', // Replace with your roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    };

    res.json(response);
});

// GET Endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
