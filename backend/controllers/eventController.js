import Event from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const newEvent = new Event({ title, description, date, location });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
