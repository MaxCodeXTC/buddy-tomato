const defaultState = () => {
    return {
        user: {
            uid:"",
            email:"",
            displayName:"",
            imgUrl: "",
            refreshToken:"",
            idToken:"",
            accessToken:"",
            bio:"",
            company:""
        },
        isLoggedIn: false
    }
};

export const state = () => defaultState()

export const getters = {
  isAuthenticated(state){
    return state.isLoggedIn
  }
}

export const mutations = {
    resetStore: (state) => {
      Object.assign(state, defaultState());
    },
    
    setAuthUser: (state, { authUser, claims }) => {
      state.user.uid = authUser.uid,
      state.user.email = authUser.email,
      state.user.displayName = authUser.displayName,
      state.user.imgUrl = authUser.photoURL,
      state.user.refreshToken = authUser.refreshToken
      state.isLoggedIn = true
    },

    setEmail: (state, email) => {
      state.user.email = email
    },
    setDisplayName: (state, name) => {
      state.user.displayName = name
    },
    setBio: (state, bio) =>{
      state.user.bio = bio
    },
    setCompany: (state, company) => {
      state.user.company = company
    },
    setIdToken: (state, idToken) => {
      state.user.idToken = idToken
    },
    setAccessToken: (state, accessToken) =>{
      state.user.accessToken = accessToken
    },
    updateDetails: (state, payload) => {
      state.user.company = payload.company
      state.user.bio = payload.bio
    }
}

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
      if (this.$fireAuth === null) {
        throw 'nuxtServerInit Example not working - this.$fireAuth cannot be accessed.'
      }
  
      if (ctx.$fireAuth === null) {
        throw 'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
      }
  
      if (ctx.app.$fireAuth === null) {
        throw 'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
      }
  
      // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
  
      /** Get the VERIFIED authUser from the server */
      if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
        const { allClaims: claims, ...authUser } = ctx.res.locals.user
    
        console.info(
          'Auth User verified on server-side. User: ',
          authUser,
          'Claims:',
          claims
        )

        await dispatch('auth/onAuthStateChangedAction', {
          authUser,
          claims
        })
  
      }
    },
    onAuthStateChangedAction({ commit }, { authUser, claims }) {
        if (!authUser) {
            commit('resetStore')
            return
          }
        commit('setAuthUser', { authUser, claims })
    },
  
    checkVuexStore(ctx) {
      if (this.$fireAuth === null) {
        throw 'Vuex Store example not working - this.$fireAuth cannot be accessed.'
      }
  
      alert(
        'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
      )
      return
    },
}