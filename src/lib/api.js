import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

const getProfessionals = async (filter) => {
  const page = filter ? filter.queryKey[1].page : 1
  const { data } = await api.get(`/professionals?page=${page}`);

  return data;
};

const getProfessional = async (id) => {
  const { data } = await api.get(`/professionals/${id}`);

  return data;
};

const getProfessionalByFilter = async (filter) => {
  const { name, sport, page } = filter.queryKey[1]
  let url = `/professionals/filter?page=${page}`
  url += name ? `&name=${name}` : ''
  url += sport ? `&sport=${sport}` : ''

  const { data } = await api.get(url);

  return data;
};

const getSports = async () => {
  const { data } = await api.get(`/sports`);

  return data;
};

const postStudent = async data => {
  try {
    const response = await api.post('/students', data)

    return response;
  } catch(e) {
    return e
  }
  
}

export { getProfessionals, getProfessional, getSports, getProfessionalByFilter, postStudent };