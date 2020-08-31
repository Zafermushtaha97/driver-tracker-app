<template>
  <div class="driver-view">
    <section class="top-bar">
           <div v-if="user" class="email-driver">{{user.email}}</div>
      <div class="driver">Driver</div>
      <button v-if="user" class="ui button red" @click="signOutButtonPressed">Signout</button>
    </section>
<section ref="map" class="map"></section>
<section class="bottom-bar">
      <div class="latLngLabel">{{lat}}, {{lng}}</div>
      <button class="ui button green" @click="startLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Start Location
      </button>
<button class="ui button red" @click="stopLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Stop Location
      </button>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
    data() {
    return {
      user: null,
       lat:null,
      lng:null,
      watchPositionId:null

    };
  },
 methods: {
    signOutButtonPressed() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({
            name: "signin"
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

          )
         

        },
        error => {
          console.log(error.message);
        }
      );
    },
    stopLocationUpdates() {
  navigator.geolocation.clearWatch(this.watchPositionId);
},
updateLocation(lat, lng) {
    const db = firebase.firestore();
    db.collection("users")
        .doc(this.user.uid)
        .set({ lat:lat, lng: lng, active:true }, { merge: true });
}
 },
   mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
}
</script>


<style>
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
</style>