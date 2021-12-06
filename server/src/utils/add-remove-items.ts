import { Model } from 'mongoose';

export async function addItemToList(
  containerId: any,
  listName: string,
  newItemId: any,
  model: Model<any>,
) {
  const container = await model.findById(containerId);
  container[listName] = [...container[listName], newItemId];
  container.save();
}

export async function removeItemFromList(
  containerId: any,
  listName: string,
  deletedItemId: any,
  model: Model<any>,
) {
  const container = await model.findById(containerId);
  container[listName] = container[listName].filter((el) => {
    return el.toString() !== deletedItemId;
  });
  container.save();
}
