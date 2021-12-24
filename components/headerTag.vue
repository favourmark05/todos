<template>
  <div class="container d-flex justify-content-center">
      <header class="py-5">
          <h1 class="font-weight-bold text-danger"> {{ head }} </h1>
      </header>

  </div>
</template>

<script>
export default {
    name: 'header-app',
    data () {
        return {
            head: 'MY TODO LIST APP'
        }
    }

}
</script>

<style>

</style>