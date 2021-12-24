// import Vue from 'vue'
import axios from 'axios'
const baseUrl = "https://simp-node-todo.herokuapp.com/"

// state
const state = () => ({
        todos: [],
    })
    //getters
const getters = {
        todo_list: state => state.todos,
    }
    //actions

const actions = {
        async getTodos({ commit }) {
            const res = await axios.get(baseUrl + "todo")
            commit('SET_TODOS', res.data);
            return res.data
        },

        async editTodo({ dispatch }, { payload, id }) {
            const res = await axios.put(`${baseUrl}todo/${id}`, payload)
            dispatch('UPDATE_TODO')
            return res
        },
        async deleteTodo({ dispatch }, { id }) {
            const res = await axios.delete(`${baseUrl}todo/${id}`)
            dispatch('DELETE_TODO')
            return res
        },
        async addTodo({ dispatch }, { payload }) {
            const res = await axios.post(baseUrl + "todo", payload)
            dispatch('ADD_TODO')
            return res.data
        },

    }
    // mutations

const mutations = {
    SET_TODOS(state, data) {
        state.todo_list = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}