import subject from "../../models/subject.js";

const saveData = async (req, res) => {
  //   const { name, questions, systemAnswers, userAnswers, similarityScores, times } = req.body;
  const { name, times, questions } = req.body;
  //   const newSubject = new Subject({
  //     name,
  //     questions,
  //     systemAnswers,
  //     userAnswers,
  //     similarityScores,
  //     times,
  //   });

  const newSubject = new subject({
    name,
    times,
    questions,
  });

  try {
    await newSubject.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getNames = async (req, res) => {
  try {
    // Retrieving only the "name" field for all documents
    const subjects = await subject.find({}, "name -_id");

    // Mapping over the subjects array to extract only the name values
    const names = subjects.map((subject) => subject.name);

    res.status(200).json(names); // Sending back an array of names
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTimes = async (req, res) => {
  const { name } = req.params; // Extracting the name from request parameters

  try {
    const result = await subject.find({ name: name }, "times -_id"); // Query documents by name

    const times = result.map((subject) => subject.times);
    res.status(200).json(times);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getQuestions = async (req, res) => {
  const { name } = req.params; // Extracting the name from request parameters

  try {
    const result = await subject.find({ name: name }, "questions -_id"); // Query documents by name

    const questions = result.map((subject) => subject.questions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { saveData, getNames, getTimes, getQuestions };
