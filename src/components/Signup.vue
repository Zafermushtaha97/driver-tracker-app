<template>
  <section class="ui centered grid main">
    <div class="column" style="max-width:450px;">
      <form class="ui segment large form" style="margin-top:5em;">
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
          <button class="ui button fluid large green" @click.prevent="signUpButtonPressed">Sign up</button>
        </div>
         <router-link :to="{ name: 'signin' }" tag="a" class="ui button basic">Log in</router-link>
      </form>
    </div>
  </section>
</template>
<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
   signUpButtonPressed() {
   firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
         this.addUserToDB(user);
      })
      .catch(error => {
         this.error = error.message;
      });
},
async addUserToDB({user}) {
   try {
      const db = firebase.firestore(); 
      db.collection("users")
         .doc(user.uid)
         .set({
            email: user.email,
            active:false
         });
         this.$router.push({name: 'Home',})
      
   } catch (error) {
      console.log(error.message);
   }
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
    height: 790px;
    background-position: center;
    background-size: cover;

    }
</style>