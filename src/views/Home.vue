<template>
  <div class="home text-center">
    <Driver></Driver>
    </div>
</template>

<script>
// @ is an alias to /src
import Driver from '@/components/Driver'
export default {
  name: 'Home',
  components: {
    Driver
  }
}
</script>
<style>
.text-center{
  text-align: center;
}
</style>