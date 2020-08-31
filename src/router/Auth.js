import firebase from  '@/firebase/init'
router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (!userAuth && to.matched.some(record => record.meta.requiresAuth)) {
        next({
          name: 'Signin'
        })
      } else if (userAuth) {
        if (to.matched.some(record => record.meta.guest)) {
          next(from.fullPath)
        } else {
          firebase.firestore().collection("roles").doc(userAuth.uid).get().then(snapShot => {
            if (snapShot.data().isAdmin) {
              next({
                name: 'Admin'
              })
            } else {
              next({
                name: 'Driver'
              })
            }
          })
        }
      } else {
        next()
      }
    })
    next()
  })