async function loadModel()
{
  model = await tf.loadModel('model/model.json')
  model.predict(tf.zeros([1, 2, 2, 3])).print()
  model.layers[1].getWeights()[0].print()
  model.layers[1].getWeights()[1].print()
  model.layers[1].getWeights()[2].print()
  model.layers[1].getWeights()[3].print()
}

loadModel()
