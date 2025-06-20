import express from 'express';
import Center from '../model/centerModel.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const centers = await Center.find({});
        res.status(200).json(centers);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/:center", async (req, res) => {
    try {
        const searchParam = req.params.center.toLowerCase();
        const centers = await Center.find({
            $or: [
                { name: { $regex: searchParam, $options: 'i' } },
                { address: { $regex: searchParam, $options: 'i' } },
                { pincode: { $regex: searchParam, $options: 'i' } }
            ]
        });

        if (centers.length === 0) {
            return res.status(404).json({ message: "No matching centers found" });
        }

        

        res.status(200).json({
            centers,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
)

router.post("/", async (req, res) => {
    const { name, address, phoneNumber, pincode, email } = req.body;

    if (!name || !address || !phoneNumber || !pincode || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingCenter = await Center.findOne({ name });
        if (existingCenter) {
            return res.status(400).json({ message: "Center with this name already exists" });
        }

        const newCenter = new Center({
            name,
            address,
            phoneNumber,
            pincode,
            email
        });

        await newCenter.save();
        res.status(201).json(newCenter);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})



export default router;