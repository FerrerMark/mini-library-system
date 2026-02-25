import Borrower from "../model/Borrower.js";

export const getAllBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.find().populate('user').populate('borrowedBook');
        res.status(200).send({message: "Borrower fetched successfully", data: borrower});
    } catch (err) {
        console.error("Error fetching borrower:", err.message);
        res.status(500).send("Server error");
    }
}

export const addBorrower = async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            const borrowers = await Borrower.insertMany(data);
            return res.status(201).json({ message: "Borrowers added successfully", data: borrowers });
        } else {
            const { name, borrowedBook } = req.body;
            const borrower = await Borrower.create({ name, borrowedBook });
            return res.status(201).json({ message: "Borrower added successfully", data: borrower });
        }
    } catch (err) {
        console.error("Error adding borrower:", err.message);
        res.status(500).send("Server error");
    }
};

export const updateBorrower = async (req, res) => {
    try {
        const { user, borrowedBook } = req.body;
        const borrower = await Borrower.findByIdAndUpdate(req.params.id, { user, borrowedBook });
        return res.status(201).json({ message: "Borrower updated successfully", data: borrower });
    } catch (err) {
        console.error("Error adding borrower:", err.message);
        res.status(500).send("Server error");
    }
}

export const deleteBorrower = async (req, res) => {
    try {
        const borrowers = await Borrower.findByIdAndDelete(req.params.id);
        return res.status(201).json({ message: "Borrowers deleted successfully", data: borrowers });
    } catch (err) {
        console.error("Error adding borrower:", err.message);
        res.status(500).send("Server error");
    }
};

export const deleteAllBorrower = async (req, res) => {
    try {
        const borrowers = await Borrower.deleteMany();
        return res.status(201).json({ message: "Borrowers deleted successfully", data: borrowers });
    } catch (err) {
        console.error("Error adding borrower:", err.message);
        res.status(500).send("Server error");
    }
};
