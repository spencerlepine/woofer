const MODELS = require("../index")

const getModelDocumentById = (ModelName, idKey, documentId) => {
  const Model = MODELS[ModelName]

  const query = { [idKey]: documentId }

  return Model.findOne(query).then((result) => {
    if (result) {
      return result
    }

    return {
      message: `Unable to find ${ModelName} document`,
      error: `Document with id: ${documentId} not found`,
    }
  })
}

const createModelDocumentById = (ModelName, idKey, documentId, documentData) => {
  const Model = MODELS[ModelName]

  const query = { [idKey]: documentId }
  const update = {
    $set: documentData,
  }
  const options = { upsert: true, multi: true }

  return Model.updateOne(query, update, options).then((result) => {
    if (result) {
      return getModelDocumentById(ModelName, idKey, documentId)
    } else {
      return {
        message: "Unable to update document",
        error: "Model.updateOne did not return a document",
      }
    }
  })
}

const updateModelDocumentById = (ModelName, idKey, documentId, documentData) => {
  const Model = MODELS[ModelName]

  const query = { [idKey]: documentId }
  const update = {
    $set: documentData,
  }
  const options = {}

  return Model.updateOne(query, update, options).then((result) => {
    if (result) {
      return getModelDocumentById(ModelName, idKey, documentId)
    } else {
      return {
        message: `Unable to update ${ModelName} document`,
        error: "No document found to update",
      }
    }
  })
}

const deleteModelDocumentById = (ModelName, idKey, documentId) => {
  const Model = MODELS[ModelName]

  const query = { [idKey]: documentId }
  const options = { justOne: true }

  return Model.deleteOne(query, options).then((result) => {
    return result
  })
}

module.exports = {
  getModelDocumentById: getModelDocumentById,
  createModelDocumentById: createModelDocumentById,
  updateModelDocumentById: updateModelDocumentById,
  deleteModelDocumentById: deleteModelDocumentById,
}
