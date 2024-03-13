import subject from "../../models/subject.js";

const saveData = async (req, res) => {
  //   const { name, questions, systemAnswers, userAnswers, similarityScores, times } = req.body;
  const { name, times, questions, userAnswers, similarityScores } = req.body;
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
    userAnswers,
    similarityScores,
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

const getTimesAndScores = async (req, res) => {
  const { name } = req.params; // Extracting the name from request parameters

  try {
    const result = await subject.find(
      { name: name },
      "times similarityScores -_id"
    ); // Query documents by name

    const timesAndScores = result.map((subject) => ({
      times: subject.times,
      similarityScores: subject.similarityScores,
    }));
    res.status(200).json(timesAndScores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getQuestionsAnswers = async (req, res) => {
  const { name } = req.params; // Extracting the name from request parameters

  try {
    const result = await subject.find(
      { name: name },
      "questions userAnswers -_id"
    ); // Querying documents by name and include userAnswers in the selection

    const questionsAndAnswers = result.map((subject) => ({
      questions: subject.questions,
      userAnswers: subject.userAnswers,
    }));
    res.status(200).json(questionsAndAnswers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { saveData, getNames, getTimesAndScores, getQuestionsAnswers };
