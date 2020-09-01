<template>
  <section class="ui centered grid main">
    <div class="column" style="max-width:450px;">
      <form class="ui segment large form" style="margin-top:5em;"
      @submit.prevent="loginButtonPressed">
<div class="ui segment">
          <div class="field">
              <div class="ui left icon input large">
              <input type="text" placeholder="Enter your email" v-model="email" />
              <i class="ui icon user"></i>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input large">
              <input type="password" placeholder="Enter your password" v-model="password" />
              <i class="ui icon key"></i>
            </div>
          </div>
          <button class="ui button fluid large green" type="submit">Log in</button>
        </div>
        <router-link :to="{ name: 'signup' }" tag="a" class="ui button basic">Sign up</router-link>
      </form>
    </div>
  </section>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginButtonPressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log("user is singed in "+user);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:ital@1&display=swap');
    .font-zilla{
            font-family: 'Zilla Slab', serif;
            font-size: 3em;
            color: #333447;
    }
    .main{
    background-image: url(../assets/map.jpg);
    height:105vh;
    background-position: center;
    background-size: cover;

    }
</style>