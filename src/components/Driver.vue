<template>
  <div class="driver-view">
    <div class="left-bar bg-white">
      <div v-if="user">
        <b-button  v-if="!profile.imageurl"  @click="onPickFile" variant="primary"
        >profile picture</b-button>
        <input type="file"  ref="fileInput" @change="onFilePicked"
                class="d-none" accept="image/*">
          </div>
        <div class="w-75 mx-auto my-2" v-if="user">
        <b-img v-if="profile.imageurl" :src="profile.imageurl" rounded="circle" alt="profile  image" 
          class="img-thumbnail responsive-img"></b-img> 
        </div>
        <div>
          <b-img :src="imageurl"></b-img>
        </div>

        <div class="driver">Driver</div>
        <div class="name-driver" v-if="user">{{profile.username}}</div>
        <div v-if="user" class="email-driver text-break">{{user.email}}</div>
      <b-button v-if="user" variant="danger" size="md " class="btn-text mt-3" @click="signOut">Signout</b-button>
      <div class="latLngLabel my-3">
              <h5>lat:{{lat}}</h5>
              <h5>lng:{{lng}}</h5> 
      </div>
      <div class="mt-5 pt-5">
        <div >
          <b-button v-if="!startbtn" variant="success" class="mx-3 mt-5 btn-text" @click="startLocationUpdates">
              <i v-if="!startbtn" class="far fa-play-circle"></i>
                Start  
        </b-button>
        </div>
        <div >
          <b-button  v-if="startbtn" variant="danger" class="btn-text mx-3 mt-5" @click="stopLocationUpdates">
          <i v-if="startbtn" class="far fa-stop-circle"></i>
          Stop 
          </b-button>
        </div>
      </div>
    </div>
    <section ref="map" class="map">
    </section>
    <!-- start location alert -->
    <div class="alert-start m-3">
      <b-alert
      :show="dismissCountDown"
      dismissible
      class="alert"
      variant="success"
      fade
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="dismissSecs"
    >
      you'r start location ...
    </b-alert>
    </div>

    <!-- Stop location alert -->
    <div class="alert-start m-3">
      <b-alert
      :show="dismissCountDownstop"
      dismissible
      class="alert"
      variant="danger"
      fade
      @dismissed="dismissCountDownstop=0"
      @dismiss-count-down="dismissSecs"
    >
      you'r Stop location ...
    </b-alert>
    </div>

  </div>
</template>
<script>
import * as firebase from 'firebase'
export default {
  components:{
    
  },
    data() {
    return {
      user: null,
      lat:"00.00",
      lng:"00.00",
      map:null,
      watchPositionId:null,
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDownstop:0,
      startbtn:false,
      profile:null,
      image:null,
      imageurl:''

    };
  },
methods: { 
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({
            name: "login"
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    startLocationUpdates() {
            var map = new google.maps.Map(this.$refs["map"], {
            zoom: 15,
            StreetViewControl:false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          var marker = new google.maps.Marker({
            map: map
            });
      navigator.geolocation.watchPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          map.setCenter(new google.maps.LatLng(this.lat, this.lng)); 
          marker.setPosition(new google.maps.LatLng(this.lat, this.lng));
          this.watchPositionId = navigator.geolocation.watchPosition(
            this.updateLocation(this.lat, this.lng),
            this.startbtn = true
            
          );
        },
        error => {
          console.log(error.message);
        }
      );
    },
    stopLocationUpdates() {
  navigator.geolocation.clearWatch(this.watchPositionId);
  this.showAlertstop()
  this.startbtn = false
},
updateLocation(lat, lng) {
    const db = firebase.firestore();
    db.collection("users")
        .doc(this.user.uid)
        .set({ lat:lat, lng: lng, active:true}, { merge: true });
        this.showAlert()
},

    showAlert(){
      this.dismissCountDown = this.dismissSecs
    },
    showAlertstop(){
      this.dismissCountDownstop = this.dismissSecs
    },
    onPickFile(){
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
              const file = event.target.files[0];
              firebase.storage().ref('images/'+file.name).put(file).then(res =>{
                res.ref.getDownloadURL().then((downloadURL) =>{
                this.updateimageurl(downloadURL)
                }
                )
              })    
            },
  updateimageurl(imageurl){
    const db = firebase.firestore();
    db.collection("users").doc(this.user.uid)
    .set({
      imageurl:imageurl
    },{ merge: true })
  },
  async Getprofileinfo(){
    firebase.firestore().collection('users').doc(this.user.uid).get().then(user =>{
      this.profile = user.data()
    })
  },
  displayMap(){
      this.map = new google.maps.Map(this.$refs["map"], {
          zoom: 15,
          StreetViewControl:true,
          center: new google.maps.LatLng(-23.55052,-46.633309),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });
  } },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.Getprofileinfo()
      this.displayMap()
      
    });

  //  firebase.auth().onAuthStateChanged(user =>{
  //    this.user = user;
  // // firebase.firestore().collection('users').doc(this.user.uid).get().then(snapshot =>{
  // //       snapshot.forEach(doc =>{
  // //         this.user = doc.data(),
  // //         this.user.id= doc.id
  // //       })
  // //     })
    //  firebase.firestore().collection('users').doc(this.user.uid).get().then(user =>{
    //     this.profile = user.data()
    //     console.log(this.profile)
    //   })
  //  }) 
  }, 
  computed:{

  },
}
</script>


<style scopped>
.driver-view {
  display: flex;
  flex-direction: row;
  height: 100vh;

}
.left-bar {
  width: 280px;
  text-align: center;
  padding: 3em;
  border-right: 1px solid green;
}
.map {
  flex-grow: 1;
}

.driver{
  font-size: 22px;
}
.email-driver , .name-driver{
  color:#57c52a;
  font-size: 22px;
}
.btn-text{
  font-size: 1.2em;
}
.alert-start{
    position: fixed;
    right: 35%;
    left: 35%;
    }
   .img-thumbnail{
    padding: 3px;
    background-color: #fff;
    border:2px solid #57c52a;
}
.responsive-img{
    width: 80%;

}
</style>