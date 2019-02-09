<template>
  <section class="signup">
    <div class="container">
      <div class="row"> 
        <div class="col-md-12 col-lg-12 col-12">
          <div class="sign__up">
          <form  @submit.prevent="onSignup">

            <h1>Sign Up Now!<span>Sign up and share your festival!!</span></h1>

            <div class="sign__up-section"><span>1</span>Name &amp; Email</div>
            <div class="sign__up-inner">
              <div class="input__field">
                <label class="label">Name</label>
                <input name="name" v-model="model.name" v-validate="'required|alpha'" :class="{'input': true }" type="text" placeholder="Name">
                
                <transition name="error-validation">
                  <span v-show="errors.has('name')" class="form-error">{{ errors.first('name') }}</span>
                </transition>
              </div>
              <div class="input__field">
                <label class="label" for="email">Email</label>
                <input name="email" v-model="model.email" v-validate="'required|email'" :class="{'input': true}" type="text" placeholder="Email">
                
                <transition name="error-validation">
                  <span v-show="errors.has('email')" class="form-error">{{ errors.first('email') }}</span>
                </transition>
              </div>
            </div>

            <div class="sign__up-section"><span>2</span>Passwords</div> 
                <div class="sign__up-inner">
                  <div class="input__field">
                    <label class="label" for="password">Password</label>
                    <input v-model="model.password" v-validate="'required'" name="password" type="password" class="input" placeholder="Password" >
                  
                    <transition name="error-validation">              
                    <span  class="form-error" v-if="errors.has('password')">
                      {{ errors.first('password') }}
                    </span>
                    </transition>
                  </div >
                  <div class="input__field">
                    <label class="label" for="password">Confirm Password</label>
                    <input v-model="model.confirmpassword" v-validate="'required'" name="password_confirmation" type="password" class="input" placeholder="Password, Again">
                    <transition name="error-validation">
                      <span  class="form-error" v-if="errors.has('password_confirmation')"> {{ errors.first('password_confirmation') }}</span>
                      <span class="form-error" v-if="this.noMatchPasswords"> Passwords do not match</span>
                    </transition>
                  </div>
            </div>

            <button class="btn btn-primary" type="submit">Submit</button>
            
            <span class="privacy-policy">
              <label class="checkbox">
                <input name="terms" v-validate="'required'" type="checkbox">
                I agree to the terms and conditions.
              </label>
              <transition name="error-validation">
                <span class="form-error" v-show="errors.has('terms')">{{ errors.first('terms') }}</span>
              </transition>
            </span>

          </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        noMatchPasswords: false,
        model: {
          name: '',
          email: '',
          password: null,
          confirmpassword: null
        }
      }
    },
    computed: {
      ...mapGetters(['loading', 'user', 'error'])
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            if (this.model.password === this.model.confirmpassword) {
              this.$store.dispatch('signUpUser', {email: this.model.email, password: this.model.password})
              this.noMatchPasswords = false
              return
            } else {
              this.noMatchPasswords = !this.noMatchPasswords
            }
          }
        })
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style lang="scss" scoped>

@import '.././stylus/scss/main';

.sign__up{

    padding:30px;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);

    &-inner {
      padding: 30px;
      background-color: $grey-light;
      border-radius: 6px;
      margin-bottom: 15px;

      & span {
        display: block;
        padding: 0.5rem 0.3rem;
      }
    }

    & h1 {
      background-color: $secondary;
      padding: 20px 30px 15px 30px;
      margin: -30px -30px 30px -30px;
      border-radius: 10px 10px 0 0;
      color: $white;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
      font: normal 30px;
      box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
      border: 1px solid #257C9E;

      & span {
        display: block;
        margin-top: 2px;
        font-size: 13px;
      }
    }

    &-section {

      & span {
        background-color: $secondary;
        padding: 5px 10px 5px 10px;
        position: absolute;
        border-radius: 50%;
        border: 4px solid $white;
        font-size: 14px;
        margin-left: -45px;
        color: $white;
        margin-top: -3px;
      }
    }

  .privacy-policy{
    float: right;
    width: 250px;
    text-align: right;
  }
}

.error-validation-enter-active{
  transition: opacity .5s
}
.error-validation-enter, .error-validation-leave-to {
  opacity: 0;
  transition: opacity .5s
}

</style>
