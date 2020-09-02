<template>
  <div class="driver-view">
    <div class="top-bar">
           <div v-if="user" class="email-driver">{{user.email}}</div>
      <div class="driver">Driver</div>
      <b-button v-if="user" variant="danger" size="md btn-text" @click="signOut">Signout</b-button>
    </div>
<section ref="map" class="map"></section>
<section class="bottom-bar">
      <div class="latLngLabel" style="color:beige;">{{lat}}, {{lng}}</div>
      <b-button  variant="success" class="mx-3 btn-text" @click="startLocationUpdates">
        <i class="far fa-play-circle"></i>
        Start Location
      </b-button>
<b-button variant="danger" class="btn-text" @click="stopLocationUpdates">
        <i class="far fa-stop-circle"></i>
        Stop Location
      </b-button>
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
import firebase from "firebase";
export default {
  components:{
    
  },
    data() {
    return {
      user: null,
       lat:"00.00",
      lng:"00.00",
      watchPositionId:null,
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissCountDownstop:0

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
            this.updateLocation(this.lat, this.lng)
            
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
},
updateLocation(lat, lng) {
    const db = firebase.firestore();
    db.collection("users")
        .doc(this.user.uid)
        .set({ lat:lat, lng: lng, active:true }, { merge: true });
        this.showAlert()
},
    showAlert(){
      this.dismissCountDown = this.dismissSecs
    },
    showAlertstop(){
      this.dismissCountDownstop = this.dismissSecs
    }

 },
   mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
}
</script>


<style scopped>
.driver-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #333447;
}
.top-bar {
  /* height: 100px; */
  text-align: center;
  background: #333447;
  padding: 3em;
}
.map {
  flex-grow: 1;
}
.bottom-bar {
  height: 100px;
  text-align: center;
  background: #333447;
}
.driver{
  color:#f3f3f5;
  font-size: 22px;
}
.email-driver{
  color:#00ad45;
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
</style>