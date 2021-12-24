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
          <p v-else>Sorry, no description</p>
        </div>
        <div class="card-footer bg-transparent border-success">
          <div class="btn btn-danger" @click="deleteTodos(todo.id)">Delete</div>
          <div v-b-modal.modal-1 class="btn btn-primary">Edit</div>
        </div>
      </div>
    </div>

    <!-- the edit modal -->
    <!-- Modal -->
    <div>
      <b-modal id="modal-1" title="BootstrapVue">
        <form action="" @submit.prevent="editTodo()">
          <div class="mb-3">
            <label for="todoHeading" class="form-label">Todo Heading</label>
            <input type="text" class="form-control" v-model="title" />
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
              v-model="description"
            ></textarea>
          </div>
          <button class="btn btn-primary">Edit Todo</button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          id: "",
        todos: [],
        title: "",
        description: "",
      };
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
      async editTodo(id){
       try {
            let payload = {
          title: this.title,
          description: this.description,
          status: false,
          
        };
        const res = await this.$store.dispatch("editTodo", {
          payload, id
        });
        alert("Todo Edited Succesfully");
        console.log(res.data);
        this.router.go(-1)
        this.title = "";
        this.description = "";
       } catch (error) {
           console.log(error)
       }
      },
    },
  };
</script>

<style></style>
