const express = require("express")

const app = express()
const PORT = 8080

try {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
} catch (e){
    console.error(e);
}