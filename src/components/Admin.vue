<template>
  <div class="admin-view">
    <section class="left-view">
      <div class="ui segment center aligned">
        <div v-if="user">{{user.email}}</div>
        <div class="admin">Admin</div>
        <button v-if="user" class="ui button red" @click="signOutButtonPressed">Signout</button>
      </div>
      <div class="ui segment userslist" v-if="drivers.length >0">
        <div class="ui divided items">
          <div
            class="item"
            v-for="driver in drivers"
            :key="driver.id"
          >
            <div class="content">
              <div class="header white-color">{{driver.email}}</div>
              <div class="meta white-color">
                Lat : {{driver.lat}}
                <br />
                Lng :{{driver.lng}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="right-view" ref="map"></section>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      drivers: [],
      map:null,
    };
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
    this.map = new google.maps.Map(this.$refs["map"], {
      zoom: 10,
      center: new google.maps.LatLng(31.53146, 34.4380955),
      mapTypeId: google.maps.MapTypeId.ROADMAP
});
var markers = []
 var {docs} = await firebase
    .firestore()
    .collection("users")
    .where("active", "==", true)
    .get();
    const infoWindows = [];

    for (let i = 0; i < docs.length; i++) {
      markers.push(
         new google.maps.Marker({
            map: this.map
         })
      );
      infoWindows.push(new google.maps.InfoWindow({
     disableAutoPan: true
  }));
   }
firebase
      .firestore()
      .collection("users")
      .where("active", "==", true)
      .onSnapshot(snap => {
        this.drivers = [];
        for (let i = 0; i < snap.docs.length; i++) {

          var driver = snap.docs[i].data();
          this.drivers.push(driver);
          markers[i].setPosition(
           new google.maps.LatLng(driver.lat, driver.lng)
        );
        infoWindows[i].setContent(
        `<div class="ui header">${driver.email} </div>`
     );
     infoWindows[i].open(this.map, markers[i]);

        }
      });
  },
  methods: {
    signOutButtonPressed() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({
            name: "Signin"
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>
<style>
.admin-view {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
}
.left-view {
  width: 20%;
  padding: 12px;
  background: #16214d;
}
.right-view {
  flex-grow: 1;
}
.admin{
   color:#2d364c;
  font-size: 18px;
}
.userslist{
  background-color: #39eafd !important;
}
.white-color{
  color:#0d0735 !important;
}
</style>
