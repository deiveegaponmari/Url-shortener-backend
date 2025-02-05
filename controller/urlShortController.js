const urlShortController = require("express").Router();
const { urlModel } = require("../model/UrlShortModel");
const { generateShortId } = require("../utils/ShortId");
require('dotenv').config()

urlShortController.post("/shorten", async (req, res) => {
  try {
    //Get the value from client(body)
      const { category, bigurl } = req.body;
      if(!bigurl){
        return res.status(400).json({error:"URL is required"})
      }
      //validate url format
      try{
        new URL(bigurl);
      }catch(error){
        return res.status(400).json({error:"Invalid URL format"})
      }
      // Generate a short ID
      const shortId = generateShortId(6);
      console.log(shortId);
      //calculate short Url create by user
     // const calcShortUrl=0 + 1;
      // Create a new URL entry(store to database)
      const newUrl = new urlModel({ Category: category, BigUrl: bigurl, ShortId: shortId});

      // Save to database
      await newUrl.save();
      // Send response
      /*  return res.json({ shortUrl: `http://localhost:4000/urlshort/${shortId}` });  */
      return res.json({shortURL:`${req.protocol}://${req.get("host")}/urlshort/${shortId}`})
      //const shortUrl=new urlModel({shortUrl:shortURL})
    } catch (error) {
      console.error("Error saving URL:", error);

      // If an error occurs, send only one response
      return res.status(500).json({ error: "Internal Server Error" });
  }
});

urlShortController.get("/",(req,res)=>{
  res.send("Hello its working")
})

// Route to redirect to the original URL
urlShortController.get("/:shortId", async (req, res) => {
  try{
    const { shortId } = req.params;
    console.log(shortId)
  const urlEntry = await urlModel.findOne({ShortId:shortId });
  console.log(urlEntry)

  if (!urlEntry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  //ensure URL has protocol
  let redirectURL=urlEntry.BigUrl;
  if(!redirectURL.startsWith('http://') && !redirectURL.startsWith('https://')){
    redirectURL = 'https://' + redirectURL;
  }
  res.redirect(redirectURL)
  }catch(error){
    res.status(500).json({error:"server error while redirecting"})
  }
});

//Get all URL'S
urlShortController.get("/allURL", async(req,res)=>{
  try{
const urls=await urlModel.find();
console.log(urls)
res.json(urls)
  }
  catch(error){
    res.status(500).json({error:"server error while fetching url's"})
  }

})
module.exports = {
  urlShortController
}