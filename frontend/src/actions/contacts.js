import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
  headers: { 'Authorization': 'token' }
});

const loadContactSuccess = (data, page, totalPages) => ({
  type: 'LOAD_CONTACT_SUCCESS',
  data,
  page,
  totalPages
})

const loadContactFailure = () => ({
  type: 'LOAD_CONTACT_FAILURE'
})

export const loadContact = () => (dispatch, getState) => request.get('users', { params: getState().contacts.params })
  .then(({ data }) => {
    // console.log(getState(), 'wkwkwk')
    dispatch(loadContactSuccess(data.data.contacts, data.data.page, data.data.totalPages))
  }).catch((err) => {
    dispatch(loadContactFailure())
  })

const loadMoreSuccess = (data) => ({
  type: 'LOAD_MORE_SUCCESS',
  data
})

// const loadMoreFailure = () => ({
//   type: 'LOAD_MORE_FAILURE'
// })


export const loadMore = () => (dispatch, getState) => {
  let state = getState()
  // console.log(getState(),'ini isi getstate')
  if (state.contacts.params.page < state.contacts.params.totalPages) {
    let params = {
      ...state.contacts.params,
      page: state.contacts.params.page + 1
    }
    request.get('users', { params }).then(({ data }) => {
      params = {
        ...params,
        totalPages: data.data.totalPages
      }
      dispatch(loadMoreSuccess({ value: data.data.contacts, params }))
    })
  }
};

export const addContactSuccess = (id, data) => ({
  type: 'ADD_CONTACT_SUCCESS',
  id,
  data
})

export const addContactFailure = (id) => ({
  type: 'ADD_CONTACT_FAILURE',
  id
})

export const addContactRedux = (id, name, phone) => ({
  type: 'ADD_CONTACT',
  id,
  name,
  phone
  // addContact ngelempar 4 data (type,id,name,phone) dilempar ke reducers/contacts
})
// hasil dari { data } sama dengan response ?
// console log dimana?
// export const addContact = (name, phone) => dispatch => {
//   const id = Date.now()
//   dispatch(addContactRedux(id, name, phone))
//   return request.post('users', { name, phone })
//     .then(({ data }) => {
//       dispatch(addContactSuccess(id, data.data))
//     }).catch((err) => {
//       dispatch(addContactFailure(id))
//     })
// }
export const addContact = (name, phone) => async dispatch => {
  const id = Date.now()
 
  try {
    await dispatch(addContactRedux(id, name, phone))
    const { data } = await request.post('users', { name, phone })
     console.log('ini add', data)
     if ( data.success){
      dispatch(addContactSuccess(id,data.data))
     }
  } catch (error) {
    dispatch(addContactFailure(id)) 
  }  
 
  // export const addContact = (name, phone) => async dispatch => {
  //     const id = Date.now()

  //     dispatch(addContactRedux(id, name, phone))
  //     try {
  //       const { data } = await request.post('users', { name, phone })
  //       // console.log('ini add', data)
  //       dispatch(addContactSuccess(id, data.data))
  //     } catch (error) {
  //       dispatch(addContactFailure(id))
  //     }
}


const removeContactSuccess = (id) => ({
  type: 'REMOVE_CONTACT_SUCCESS',
  id
})

const removeContactFailure = () => ({
  type: 'REMOVE_CONTACT_FAILURE'
})

export const removeContact = (id) => {
  return async dispatch => {
    try {
      await request.delete(`users/${id}`)
      dispatch(removeContactSuccess(id))
    } catch (err) {
      dispatch(removeContactFailure(err))
    }
  }
}

export const updateContactSuccess = (id, data) => ({
  type: 'ADD_CONTACT_SUCCESS',
  id,
  data
})

export const updateContactFailure = () => ({
  type: 'ADD_CONTACT_FAILURE'
})

export const updateContact = (id, name, phone) => {
  return async dispatch => {
    try {
      const { data } = await request.put(`users/${id}`, { name, phone })
      dispatch(updateContactSuccess(id, data.data))
    } catch (err) {
      dispatch(updateContactFailure(err))
    }
  }
}

const resendContactSuccess = (id, data) => ({
  type: 'RESEND_CONTACT_SUCCESS',
  id,
  data
})

const resendContactFailure = () => ({
  type: 'RESEND_CONTACT_FAILURE'
})

export const resendContact = (id, name, phone) => {
  return async dispatch => {
    try {
      const { data } = await request.post('users', { name, phone })
      dispatch(resendContactSuccess(id, data.data))
    } catch (err) {
      dispatch(resendContactFailure(err))
    }
  }
}

const searchContactSuccess = (data) => ({
  type: 'SEARCH_CONTACT_SUCCESS',
  data
})

// const searchContactFailure = () => ({
//   type: 'SEARCH_CONTACT_FAILURE'
// })

// export const searchContact = (query) => (dispatch) => request.get('users')
//   .then(({ data }) => {
//     dispatch(searchContactSuccess(query)).then(dispatch(loadContact()))
//   }).catch((err) => {
//     dispatch(searchContactFailure(err))
//   })

export const searchContacts = (query) => (dispatch, getState) => {
  let state = getState()
  let params = {
    ...state.contacts.params,
    ...query,
    page: 1
  }
  request.get('users', { params }).then(({ data }) => {
    params = {
      ...params,
      totalPages: data.data.totalPages
    }
    dispatch(searchContactSuccess({ value: data.data.contacts, params }))
  })
}
export const searchContact = (query) => (dispatch, getState) => {
  let state = getState()
  let params = {
    ...state.contacts.params,
    ...query,
    page: 1
  }
  request.get('users', { params }).then(({ data }) => {
    params = {
      ...params,
      totalPage: data.data.totalPage
    }
    dispatch(searchContactSuccess({ value: data.data.contacts, params }))
  })
}






// export const updateContactRedux = (id, name, phone) => ({
//   type: 'ADD_CONTACT',
//   id,
//   name,
//   phone
// })

// export const updateContact = (id, name, phone) => dispatch => {
//   // dispatch(updateContactRedux(id, name, phone))
//   return request.put(`users/${id}`, { name, phone }).then((response) => {
//     dispatch(updateContactSuccess(id, response.data.data))
//   }).catch((err) => {
//     dispatch(updateContactFailure(id))
//   })
// }



// import axios from 'axios';

// const request = axios.create({
//   baseURL: 'http://localhost:3001/',
//   timeout: 1000,
//   headers: { 'Authorization': 'token' }
// });

// const loadContactSuccess = (contacts) => ({
//   type: 'LOAD_CONTACT_SUCCESS',
//   contacts
// })

// const loadContactFailure = () => ({
//   type: 'LOAD_CONTACT_FAILURE'
// })

// export const loadContact = () => {
//   return async dispatch => {
//     try {
//       const { data } = await request.get('users')

//       dispatch(loadContactSuccess(data.data.users))
//     } catch (error) {
//       dispatch(loadContactFailure())
//     }
//   }
// }


// // export const loadContact = () => dispatch => request.get('users').then((response) => {
// //   dispatch(loadContactSuccess(response.data.data))
// // }).catch((err) => {
// //   dispatch(loadContactFailure())
// // })

// // export const loadContact = () => async dispatch => {
// //   try {
// //     const { data } = await request.get('users', { params: this.params })
// //     dispatch(loadContactSuccess(data.data.users))
// //   } catch (error) {
// //     dispatch(loadContactFailure())
// //   }
// // }

// // loadMore = (page) => {
// //   if (this.params.page <= this.params.pages) {
// //     this.params = ({
// //       ...this.params,
// //       page: this.params.page + 1
// //     })
// //     this.loadContact()
// //   }
// // }

// export const searchContact = (name, phone) => dispatch => request.get('users', { ...this.params, name, phone, page: 1 }).then((response) => {
//   dispatch(loadContactSuccess(response.data.data))
// }).catch((err) => {
//   dispatch(loadContactFailure())
// })

// export const addContactSuccess = (id, contact) => ({
//   type: 'ADD_CONTACT_SUCCESS',
//   id,
//   contact
// })

// export const addContactFailure = (id) => ({
//   type: 'ADD_CONTACT_FAILURE',
//   id
// })

// export const addContactRedux = (id, name, phone) => ({
//   type: 'ADD_CONTACT',
//   id,
//   name,
//   phone
//   // addContact ngelempar 4 data (type,id,name,phone) dilempar ke reducers/contacts
// })

// export const addContact = (name, phone) => dispatch => {
//   const id = Date.now()
//   dispatch(addContactRedux(id, name, phone))
//   return request.post('users', { name, phone }).then((response) => {
//     dispatch(addContactSuccess(id, response.data.data))
//   }).catch((err) => {
//     dispatch(addContactFailure(id))
//   })
// }

// const removeContactSuccess = (id) => ({
//   type: 'REMOVE_CONTACT_SUCCESS',
//   id
// })

// const removeContactFailure = () => ({
//   type: 'REMOVE_CONTACT_FAILURE'
// })

// export const removeContact = (id) => dispatch => {
//   return request.delete(`users/${id}`).then((response) => {
//     dispatch(removeContactSuccess(id))
//   }).catch((err) => {
//     dispatch(removeContactFailure())
//   })
// }

// const resendContactSuccess = (id, contact) => ({
//   type: 'RESEND_CONTACT_SUCCESS',
//   id,
//   contact
// })

// const resendContactFailure = () => ({
//   type: 'RESEND_CONTACT_FAILURE'
// })

// export const resendContact = (id, name, phone) => dispatch => {
//   return request.post('users', { name, phone }).then((response) => {
//     dispatch(resendContactSuccess(id, response.data.data))
//   }).catch((err) => {
//     dispatch(resendContactFailure())
//   })
// }

// export const updateContactSuccess = (id, contact) => ({
//   type: 'ADD_CONTACT_SUCCESS',
//   id,
//   contact
// })

// export const updateContactFailure = () => ({
//   type: 'ADD_CONTACT_FAILURE'
// })

// // export const updateContactRedux = (id, name, phone) => ({
// //   type: 'ADD_CONTACT',
// //   id,
// //   name,
// //   phone
// // })

// export const updateContact = (id, name, phone) => dispatch => {
//   // dispatch(updateContactRedux(id, name, phone))
//   return request.put(`users/${id}`, { name, phone }).then((response) => {
//     dispatch(updateContactSuccess(id, response.data.data))
//   }).catch((err) => {
//     dispatch(updateContactFailure(id))
//   })
// }   
