import axios from 'axios';

const api = axios.create({ baseURL: process.env.API_URL });

const getProfessionals = async () => {
  const { data } = await api.get(`/professionals`);

  return data;
};

const getProfessional = async (id) => {
  const { data } = await api.get(`/professionals/${id}`);

  return data;
};

const getProfessionalByFilter = async (filter) => {
  console.log(filter)
  const { name, sport } = filter.queryKey[1]
  let url = '/professionals/filter?'
  if (name && !sport) {
    url += `name=${name}`
  }
  else if (!name && sport) {
    url += `sport=${sport}`
  }
  else {
    url += `name=${name}&sport=${sport}`
  }
  const { data } = await api.get(url);

  return data;
};

const getSports = async () => {
  const { data } = await api.get(`/sports`);

  return data;
};

export { getProfessionals, getProfessional, getSports, getProfessionalByFilter };