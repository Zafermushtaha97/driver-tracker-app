<template>
  <div class="admin-view">
    <section class="left-view">
      <div class="text-center">
        <div v-if="user" class="email-admin">{{user.email}}</div>
        <div class="admin">Admin</div>
        <b-button v-if="user" variant="danger" @click="signOutButtonPressed">Signout</b-button>
      </div>
      <div class="mt-4" v-if="drivers.length >0">
        <b-list-group>
          <b-list-group-item
            class="item"
            v-for="driver in drivers"
            :key="driver.id"
            style="background:#004d73;"
          >
            <div style="color:#dbebfa;">
              <div class="d-flex justify-content-between">
                <h5>{{driver.username}}</h5>
                <b-img v-if="driver.imageurl" :src="driver.imageurl" class="w-25 mxh-70" rounded="circle"></b-img>
                </div>
              <h6>{{driver.email}}</h6>
              <div>
                Lat : {{driver.lat}}
                <br />
                Lng :{{driver.lng}}
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
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
        `<div class="font-size-info">${driver.username} </div>`
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
  /* background: #16214d; */
}
.right-view {
  flex-grow: 1;
}
.email-admin{
  color:#57c52a;
  font-size: 22px;
}
.admin{
  font-size: 18px;
}
.font-size-info{
  font-size: 1rem;
}
.mxh-70{
  max-height: 70px;
}
</style>
