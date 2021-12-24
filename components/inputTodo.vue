<template>
  <div class="container">
      <div class="form-group">
          <form action="" @submit.prevent="addTodo" >
              <div class="mb-3">
                  <label for="todoHeading" class="form-label" >Todo Heading</label>
                  <input type="text" class="form-control" v-model="title">
              </div>
              <div class="mb-3 form-floating">
                  <label for="todoDescription" class="form-label">Todo Description</label>
                  <textarea name="description" id=""  rows="10" class="form-control" v-model="description"></textarea>
              </div>
              <button class="btn btn-primary" :disabled="!title || !description">Add Todo</button>
          </form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title: "",
            description: "",
        }
    },
 methods:{
     async addTodo(){
       try {
            let payload = {
          title: this.title,
          description: this.description,
          status: false,
          
        };
        const res = await this.$store.dispatch("addTodo", {
          payload,
        });
        alert("Todo Added Succesfully");
        console.log(res.data);
        this.$router.go()
        this.title = "";
        this.description = "";
       } catch (error) {
           console.log(error)
       }
      },
 }
}
</script>

<style>

</style>