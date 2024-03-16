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
    // First, find the target document based on the name
    const targetDocument = await subject.findOne({ name: name });

    if (!targetDocument) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    // Use aggregation to find the previous document based on the createdAt timestamp
    // assuming 'createdAt' is the field you're using to determine order
    const prevDocument = await subject.aggregate([
      { $match: { createdAt: { $lt: targetDocument.createdAt } } }, // Find documents created before the target document
      { $sort: { createdAt: -1 } }, // Sort them by createdAt in descending order
      { $limit: 1 }, // Get only the most recent one (i.e., the immediate previous)
      { $project: { totalActiveTime: 1 } }, // Project only the totalActiveTime field
    ]);

    // Assuming there might not always be a previous document
    const prevTotalActiveTime =
      prevDocument.length > 0 ? prevDocument[0].totalActiveTime : null;

    // Respond with the target document and the totalActiveTime of the previous document
    res.status(200).json({
      ...targetDocument.toJSON(), // Convert the Mongoose document to a plain object
      prevTotalActiveTime: prevTotalActiveTime, // Include the previous document's totalActiveTime
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllProgressData = async (req, res) => {
  try {
    // Start an aggregation pipeline
    const aggregatePipeline = [
      {
        $project: {
          _id: 0, // Exclude the _id field
          name: 1, // Include the name field
          averageSimilarityScore: 1, // Include the averageSimilarityScore field
          completedRound: 1, // Include the completedRound field for conditional counting
          totalActiveTime: 1, // Include the totalActiveTime field
          noOfAnswers: 1, // Include the noOfAnswers field
        },
      },
      {
        $group: {
          _id: null, // Group by null to aggregate over the entire collection
          names: { $push: "$name" }, // Collect all names into an array
          averageSimilarityScores: { $push: "$averageSimilarityScore" }, // Collect all averageSimilarityScores into an array
          totalActiveTime: { $sum: "$totalActiveTime" }, // Sum all totalActiveTime values
          noOfAnswers: { $sum: "$noOfAnswers" }, // Sum all noOfAnswers values
          completedRounds: {
            // Count documents where completedRound is true
            $sum: {
              $cond: [{ $eq: ["$completedRound", true] }, 1, 0],
            },
          },
        },
      },
    ];

    // Execute the aggregation pipeline
    const [result] = await subject.aggregate(aggregatePipeline);

    // Destructure the result to extract the arrays and the count
    const {
      names,
      averageSimilarityScores,
      completedRounds,
      totalActiveTime,
      noOfAnswers,
    } = result || {};

    // Send the response with the collected data
    res.status(200).json({
      names,
      averageSimilarityScores,
      completedRounds,
      totalActiveTime,
      noOfAnswers,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(404).json({ message: error.message });
  }
};

export {
  saveData,
  getNames,
  getTimesAndScores,
  getQuestionsAnswers,
  getData,
  getAllProgressData,
};
