import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

export const getModel = async () => {
  if (model) return model;
  
  await tf.ready();
  model = tf.sequential();
  model.add(tf.layers.dense({
    units: 16,
    activation: 'relu',
    inputShape: [300 * 300 * 4]
  }));
  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax'
  }));
  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy'
  });
  
  console.log('Model initialized');
  return model;
};

export const disposeModel = () => {
  if (model) {
    model.dispose();
    model = null;
  }
};