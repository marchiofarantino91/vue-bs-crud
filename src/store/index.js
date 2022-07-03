import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    addCart({ commit }, inputForm) {
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:3000/transaction',
          inputForm)
          .then(res => {
            resolve(res)
          })
          .catch(error =>{
            reject(error)
          }) 
      })
    },

    addItem({ commit }, inputForm) {
      return new Promise((resolve, reject) => {
          axios.post('http://localhost:3000/items',
          inputForm)
          .then(res => {
            resolve(res)
          })
          .catch(error =>{
            reject(error)
          }) 
      })
    },
    editItem({ commit }, inputForm) {
      return new Promise((resolve, reject) => {
          axios.put(`http://localhost:3000/items/${inputForm.id}`,
          {
            name: inputForm.name,
            harga: inputForm.harga
          })
          .then(res => {
            resolve(res)
          })
          .catch(error =>{
            reject(error)
          }) 
      })
    },
    deleteItem({ commit }, inputForm) {
      return new Promise((resolve, reject) => {
          axios.delete(`http://localhost:3000/items/${inputForm.id}` )
          .then(res => {
            resolve(res)
          })
          .catch(error =>{
            reject(error)
          }) 
      })
    },
  },
  modules: {
  }
})
