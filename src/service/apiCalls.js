import axios from "axios";

const URL_USER = "http://13.36.169.155:8000/api/user/";
const URL_EVENTS = "http://13.36.169.155:8000/api/event/";

//users login
export const login = (data) => {
  return axios
    .post(`${URL_USER}login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

//register
export const register = (data) => {
  return axios
    .post(`${URL_USER}register`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getDataUser = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_USER}data_user`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getDataUserID = (token , ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_USER}data_user/${ID}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getDataUsers = (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_USER}list_users?page=${page}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const modifyUserID = (token , ID , data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .put(`${URL_USER}modify_user/${ID}`,data , config )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const deleteUser = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL_USER}delete_user`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer los eventos de la base de datos
export const getEvents = (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_EVENTS}active_events/${page}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer los eventos de la base de datos
export const getEvent_Participant = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_EVENTS}inactive_events`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//añadir participante al evento
export const addParticipant = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .patch(`${URL_EVENTS}add_participant_event/${id}`,null, config )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//eliminar participante del evento
export const removeParticipant = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .patch(`${URL_EVENTS}remove_participant_event/${id}`,null, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//crear nuevo usuario
export const createNewEvent = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${URL_EVENTS}new_event`, data, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer todos los mensajes
export const getAllMessage = (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL_EVENTS}message?page=${page}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//crear nuevo mensaje
export const newMessage = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${URL_EVENTS}message`, data, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//borrar mensajes
export const deleteMessages = (token, id_message) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL_EVENTS}message/${id_message}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};
