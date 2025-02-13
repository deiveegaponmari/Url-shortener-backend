const urlShortController = require("express").Router();
const { urlModel } = require("../model/UrlShortModel");
const { generateShortId } = require("../utils/ShortId");
require('dotenv').config()

//post data from client

urlShortController.post("/shorten", async (req, res) => {
  try {
    const { category, bigurl } = req.body;

    if (!bigurl) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      new URL(bigurl); // Validate URL format
    } catch (error) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortId;
    let shorturl;
    let isUnique = false;

    // ✅ Generate a unique ShortId (Retry if needed)
    while (!isUnique) {
      shortId = generateShortId(6);
      shorturl = `${req.protocol}://${req.get("host")}/urlshort/${shortId}`;

      const existingUrl = await urlModel.findOne({ ShortId: shortId });
      if (!existingUrl) isUnique = true;
    }

    // ✅ Store URL in database
    const newUrl = new urlModel({
      Category: category,
      BigUrl: bigurl,
      ShortId: shortId,
      shortUrl: shorturl
    });

    await newUrl.save();
    return res.json({ shortURL: shorturl });

  } catch (error) {
    console.error("Error saving URL:", error);
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

//Get all URL'S from server

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