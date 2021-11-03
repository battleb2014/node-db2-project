const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = id => {
  return db('cars').where('car_id', id).first();
}

const create = async car => {
  const [ id ] = await db('cars').insert(car);
  return getById(id);
}

const update = async (id, car) => {
  await db('cars').where('car_id', id).update(car);
  return getById(id);
}

const remove = id => {
  return db('cars').where('car_id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}