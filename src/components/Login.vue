<template>
  <!-- <section class="ui centered grid main">
    <div class="column" style="max-width:450px;">
      <form class="ui segment large form" style="margin-top:5em;"
      @submit.prevent="login">
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
  </section> -->
   <div class="main">
     <div class="mx-auto d-flex justify-content-center pt-5">
    <b-form class="w-25 mt-4 p-3 bg-light" @submit.prevent="login">
      <b-card>
      <b-form-group>
        <b-form-input
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="password"
          v-model="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success" class="w-100">Login</b-button>
      </b-card>
         <b-button variant="light" class="mt-2" router :to="{ name: 'signup' }">
           Sign Up
         </b-button>
    </b-form>
    </div>
  </div>
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
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("user is singed in ");
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>


<style scopped>
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