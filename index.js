import express from "express";
import fs from 'fs';

const app = express();

const PORT = 8080;
const parentFolder = `fstask`

app.use(express.json());

app.listen(PORT,()=>{
    console.log("Listening at port : 8080");
})

//create file
app.post("/createfile",async (req,res)=>{
    const getTimeStamp = Date.now();
    const formattedTime = getFormattedDateTime();
    fs.writeFile(`./${parentFolder}/${formattedTime}.txt`, `${getTimeStamp}`,
        (err) => {
            if (err) {
                return res.json({ result: `File creation failed : ${err}` });
            } else {
                return res.json({ result: `File created ${formattedTime}.txt` });
            }
        }
    )
 })

 // get files under fstask folder
 app.get("/getfiles",async(req,res)=>{
    fs.readdir(`./${parentFolder}`, (err, files) => {
        if (err) {
          return res.json({result:`Unable to scan directory: ${err}`});
        }
        const resultArray = []; 
        files.forEach((file) => {
          resultArray.push(file);
        });
        return res.json({result:`Files details`,data:resultArray});
    });
 })

function getFormattedDateTime() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
}