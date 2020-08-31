<template>
  <div class="home text-center">
    <Driver></Driver>
    </div>
</template>

<script>
// @ is an alias to /src
// import MainPage from '@/components/MainPage'
import Driver from '@/components/Driver'
export default {
  name: 'Home',
  components: {
    // MainPage,
    Driver
  }
}
</script>
<style>
.text-center{
  text-align: center;
}
</style>