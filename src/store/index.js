import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDataSave:false
  },
  mutations: {
    toggle_isDataSave(state){
      state.isDataSave= !state.isDataSave
    },
    set_isDataSave(state,value){
      state.isDataSave= value
    }
  },
  actions: {
  },
  modules: {
  }
})
