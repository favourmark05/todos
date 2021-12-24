<template>
  <div class="container text-center">
    <h3>All my Todos</h3>
    <div class="row mx-auto py-3 m-auto d-flex justify-content-center">
      <div
        class="card border-success mb-3 mx-4"
        style="max-width: 18rem;"
        v-for="(todo, index) in todos"
        :key="index" 
      >
        <div class="card-header bg-transparent border-success">
          {{ todo.title }}
        </div>
        <div class="card-body text-success">
          <h5 class="card-title">{{ todo.title }}</h5>
          <p class="card-text" v-if="todo.description">
            {{ todo.description }}
          </p>
          <p>Created At: {{ todo.createdAt | changeDateFilter }} </p>
        </div>
        <div class="card-footer bg-transparent border-success">
          <div class="btn btn-danger" @click="deleteTodos(todo.id)">Delete</div>
          <div v-b-modal.modal-1 class="btn btn-primary" :id="[todo.id]" @click="editTodo(todo.index)">Edit</div>
        </div>
      </div>
    </div>

    <!-- the edit modal -->
    <!-- Modal -->
    <div>
      <b-modal id="modal-1" title="Edit Todo">
        <form action="" @submit.prevent="editTodo(todo)">
          <div class="mb-3">
            <label for="todoHeading" class="form-label">Todo Heading</label>
            <input type="text" class="form-control" v-model="todo.title" />
          </div>
          <div class="mb-3 form-floating">
            <label for="todoDescription" class="form-label"
              >Todo Description</label
            >
            <textarea
              name="description"
              id=""
              rows="10"
              class="form-control"
              v-model="todo.description"
            ></textarea>
          </div>
          <button class="btn btn-primary">Edit Todo</button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
var moment = require('moment')
  export default {
    data() {
      return {
          id: "",
        todos: [],
        title: "",
        description: "",
        todo: {
            title: null,
            description: null,
            id: null
        }
      };
      dateToFilter: Date.now()
    },
    filters: {
        changeDateFilter:
        function (value) {
            return moment(value).fromNow()
        }
    },

    methods: {
      async getTodos() {
        try {
          const todos = await this.$store.dispatch("getTodos");
          console.log(todos);
          this.todos = todos;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteTodos(id) {
        try {
          const todos = await this.$store.dispatch("deleteTodo", { id });
          console.log(todos);
          this.getTodos();
        } catch (error) {
          console.log(error);
        }
      },
      showid(){
          console.log(this.id);
      },
      async editTodo(id){
       try {
            let payload = {
          title: this.todo.title,
          description: this.todo.description,
          status: false,
          
        };
        const res = await this.$store.dispatch("editTodo", {
          payload, id
        });
        alert("Todo Edited Succesfully");
        console.log(res.data);
        this.getTodos()
        this.title = "";
        this.description = "";
       } catch (error) {
           console.log(error)
       }
      },
    },
    async created() {
      this.getTodos();
    },
    beforeMount() {
      this.$store.dispatch("getTodos");
    },
  };
</script>

<style></style>
