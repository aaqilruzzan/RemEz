import subject from "../../models/subject.js";

const saveData = async (req, res) => {
  const {
    name,
    times,
    questions,
    userAnswers,
    similarityScores,
    averageSimilarityScore,
    systemAnswers,
    completedRound,
    totalActiveTime,
    noOfAnswers,
  } = req.body;

  const newSubject = new subject({
    name,
    times,
    questions,
    userAnswers,
    similarityScores,
    averageSimilarityScore,
    systemAnswers,
    completedRound,
    totalActiveTime,
    noOfAnswers,
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

const getData = async (req, res) => {
  const { name } = req.params;
  try {
    const targetDocument = await subject.findOne({ name: name });

    if (!targetDocument) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const prevDocument = await subject.aggregate([
      { $match: { createdAt: { $lt: targetDocument.createdAt } } },
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
      { $project: { totalActiveTime: 1 } },
    ]);

    const prevTotalActiveTime =
      prevDocument.length > 0 ? prevDocument[0].totalActiveTime : null;

    res.status(200).json({
      ...targetDocument.toJSON(),
      prevTotalActiveTime: prevTotalActiveTime,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllProgressData = async (req, res) => {
  try {
    // Starting an aggregation pipeline
    const aggregatePipeline = [
      {
        $project: {
          _id: 0, // Excluding the _id field
          name: 1, // Including the name field
          averageSimilarityScore: 1,
          completedRound: 1,
          totalActiveTime: 1,
          noOfAnswers: 1,
        },
      },
      {
        $group: {
          _id: null, // Grouping by null to aggregate over the entire collection
          names: { $push: "$name" }, // Collecting all names into an array
          averageSimilarityScores: { $push: "$averageSimilarityScore" }, // Collecting all averageSimilarityScores into an array
          totalActiveTime: { $sum: "$totalActiveTime" }, // Summing all totalActiveTime values
          noOfAnswers: { $sum: "$noOfAnswers" }, // Sum of all noOfAnswers values
          completedRounds: {
            // Count documents where completedRound is true
            $sum: {
              $cond: [{ $eq: ["$completedRound", true] }, 1, 0],
            },
          },
        },
      },
    ];

    // Executing the aggregation pipeline
    const [result] = await subject.aggregate(aggregatePipeline);

    // Destructuring the result to extract the arrays and the count
    const {
      names,
      averageSimilarityScores,
      completedRounds,
      totalActiveTime,
      noOfAnswers,
    } = result || {};

    res.status(200).json({
      names,
      averageSimilarityScores,
      completedRounds,
      totalActiveTime,
      noOfAnswers,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTopic = async (req, res) => {
  const topicName = req.params.name;
  try {
    // Ensure you correctly reference deletion across models if needed
    // The following assumes everything is stored under the `subject` model.
    // If you have separate models, you need separate delete statements for each.
    const deletionResult = await subject.deleteOne({ name: topicName });
    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res
      .status(200)
      .json({ message: "Topic and all associated data deleted successfully." });
  } catch (error) {
    console.error("Failed to delete topic and associated data:", error);
    res
      .status(500)
      .json({ message: "Error deleting the topic and associated data." });
  }
};

// Correctly export all functions
export {
  saveData,
  getNames,
  getTimesAndScores,
  getQuestionsAnswers,
  getData,
  getAllProgressData,
  deleteTopic,
};
