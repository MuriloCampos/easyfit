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

const getStudents = async () => {
  const { data } = await api.get(`/students`);

  return data;
};

const getStudent = async (email) => {
  const { data } = await api.get(`/students/email?email=${encodeURIComponent(email)}`);

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

const getProfessionalClassesOfDay = async (query) => {
  const { id, day } = query.queryKey[1]
  const { data } = await api.get(`/classes/professional_classes?id=${id}&day=${day}`)

  return data
}

const getStudentClasses = async email => {
  const { data } = await api.get(`/classes/student_classes?email=${email}`)

  return data
}

const startStripeCheckoutSession = async email => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/checkout`, { email })

  return response
}

const postNewClass = async data => {
  try {
    const response = await api.post('/classes', data)

    return response;
  } catch(e) {
    return e
  }
}

export { 
  getProfessionals, 
  getProfessional, 
  getSports, 
  getProfessionalByFilter, 
  postStudent, 
  getProfessionalClassesOfDay, 
  startStripeCheckoutSession, 
  getStudents, 
  getStudent,
  getStudentClasses,
  postNewClass,
};