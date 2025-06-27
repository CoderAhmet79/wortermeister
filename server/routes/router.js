const express = require("express")
const router = express.Router()
const worterbuch = require('../models/wordModel');
const worterPhrase = require('../models/phraseModel');

router.get('/', async (req, res) => {
  try {
      const words = await worterbuch.aggregate(
          [{ $sample: { size: 150 } }] // Fetch 150 random words
      );

     const data = {
          words: words,
        }
        res.status(200).json(data);

  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error');
  }
})

router.get('/stats', async (req, res) => {

    try {
        const lastword = await worterbuch.find().sort({_id: -1}).limit(1) //Last saved records
        const total = await worterbuch.countDocuments({});
        const totalDer = await worterbuch.countDocuments({ "artikel": "der" });
        const totalDie = await worterbuch.countDocuments({ "artikel": "die" });
        const totalDas = await worterbuch.countDocuments({ "artikel": "das" });
        const totalPhrases = await worterPhrase.countDocuments({});
  
       const data = {
            total: total,
            totalDer: totalDer,
            totalDie: totalDie,
            totalDas: totalDas,
            totalPhrases: totalPhrases,
            lastword:lastword
          }
          res.status(200).json(data);
  
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).send('Internal server error');
    }
  
  })


router.get('/newest', async (req, res) => {
  try {
      const data = await worterbuch.find().sort({ _id: -1 }).limit(150) //Last saved 150 records  
      res.status(200).json(data);   
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error');
  }
})


router.get('/phrases', async (req, res) => {
  try {
    const level = req.query.level;
    const limit = parseInt(req.query.limit);
console.log(level, limit)
    const agg = [
      {
        $match: { level: level } // Belirtilen seviyeye göre filtrele
      },
      {
        $group: {
          _id: "$phraseDeutsch", // Aynı Almanca cümleleri grupla
          phraseDeutsch: { $first: "$phraseDeutsch" }, // Ekstra olarak kaydet
          phraseTurkish: { $first: "$phraseTurkish" },
          level: { $first: "$level" },
          docId: { $first: "$_id" } // Gerçek ID’yi ayrıca kaydet
        }
      },
      {
        $sample: { size: limit } // limit kadar rastgele farklı kayıt al
      },
      {
        $project: {
          _id: "$docId", // MongoDB orijinal ID
          phraseDeutsch: 1,
          phraseTurkish: 1,
          level: 1
        }
      }
    ];

    const phrases = await worterPhrase.aggregate(agg);
    res.status(200).json(phrases);
  } catch (error) {
    console.error("Error fetching phrases:", error);
    res.status(500).send("Internal server error");
  }
});



router.post("/addphrase", async (req, res) => {
  try {
    const data = req.body;

    // Eğer gelen veri bir dizi ise toplu ekleme
    if (Array.isArray(data)) {
      const savedPhrases = await worterPhrase.insertMany(data);
      return res.status(201).json({ message: "Cümleler eklendi", data: savedPhrases });
    }

    // Tek bir cümle ise
    const phrase = new worterPhrase(data);
    const savedPhrase = await phrase.save();
    res.status(201).json({ message: "Cümle eklendi", data: savedPhrase });

  } catch (error) {
    res.status(500).json({ message: "Veri eklenirken hata oluştu", error });
  }
});

router.post('/wordexists', async (req, res) => {
    const { word } = req.body;

    try {
        const foundWord = await worterbuch.findOne({ word });

        if (foundWord) {
            return res.json({ exists: true, message: `${word} already exists in the database.` });
        } else {
            return res.json({ exists: false, message: `${word} does not exist in the database.` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
  

router.post("/tracks", async (req, res) => {
    console.log("data: "+req.body)
    try {
        console.log("data: "+req.body)
    //   const visit = new Visit(req.body);
    //   await visit.save();
    //   res.status(201).send("Time tracked successfully!");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


router.post('/wordexists', async (req, res) => {
    const { word } = req.body;

    try {
        const foundWord = await worterbuch.findOne({ word });

        if (foundWord) {
            return res.json({ exists: true, message: `${word} already exists in the database.` });
        } else {
            return res.json({ exists: false, message: `${word} does not exist in the database.` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
  

router.post("/tracks", async (req, res) => {
    console.log("data: "+req.body)
    try {
        console.log("data: "+req.body)
    //   const visit = new Visit(req.body);
    //   await visit.save();
    //   res.status(201).send("Time tracked successfully!");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

let fetchedWords = new Set();
router.get('/artest', async (req, res) => {

    try {
        const distinctWords = await worterbuch.distinct('word', { artikel: ["der", "die", "das"]});
        if (fetchedWords.size >= distinctWords.length) {
            return res.status(404).send('No more words available');
        }

        let word;
        do {
            word = distinctWords[Math.floor(Math.random() * distinctWords.length)];
        } while (fetchedWords.has(word));

        fetchedWords.add(word);
        res.json({ word });
    } catch (error) {
        res.status(500).send('Server error');
    }

})

router.post('/newword', async (req, res) => {
    
  const doc = {
      word: req.body.kelime,
      artikel: req.body.artikel,
      plural: req.body.plural,
      turkish: req.body.turkce,
      specialPhrase: req.body.cumle,
      photolink: req.body.fotoLink,
      processTime: new Date()
  };
  const wmodel = new worterbuch(doc)
  try {

      await wmodel.save();
      res.status(200).json({ message: 'A new word inserted successfully' });
      //res.redirect('new')

  } catch (error) {
      console.error('Error inserting the element:', error);
      //res.status(500).json({ error: 'Internal server error' });
  }

})
router.post('/visitors', async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',').shift() ||
      req.socket?.remoteAddress;

    const visitor = new Visitor({
      ...req.body,
      ip,
    });

    await visitor.save();
    res.status(201).json({ message: 'Visitor logged' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log visitor' });
  }
});

module.exports = router
