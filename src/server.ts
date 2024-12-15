import app from "./index" // Import the app instance from your main app file

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

console.log("server testing")
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error(`Failed to start server: `);
}

