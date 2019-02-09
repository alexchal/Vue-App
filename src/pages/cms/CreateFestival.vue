<template>
  <section class="createFestival">
  <alert :class="{alert__isActive: activeAlert}" :alertText="this.alertContent" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-6">
          <h1 class="section-title">Create a new Festival</h1>

          <datepicker v-model="model.date" ></datepicker>
          
          <form @submit.prevent="onCreateFestival">

            <div class="input__field">
              <label class="label" for="author">Author</label>
              <input v-model="model.creatorFestival" v-validate="'required'" name="author" type="text" class="input" placeholder="author" >
            
              <transition name="error-validation">              
              <span  class="form-error" v-if="errors.has('author')">
                {{ errors.first('author') }}
              </span>
              </transition>
            </div>

            <div class="input__field">
              <label class="label" for="title">Title</label>
              <input v-model="model.title" v-validate="'required'" name="title" type="text" placeholder="Title" class="input">
            
              <transition name="error-validation">              
              <span  class="form-error" v-if="errors.has('title')">
                {{ errors.first('title') }}
              </span>
              </transition>
            </div>

            <div class="input__field">
              <label class="label" for="title">Location</label>
              <input v-model="model.location" v-validate="'required'" name="location" type="text" placeholder="Location" class="input" >
            
              <transition name="error-validation">              
              <span  class="form-error" v-if="errors.has('location')">
                {{ errors.first('location') }}
              </span>
              </transition>
            </div>

            <button class="primaryCMS btn btn-primary" @click="onUploadFile" >Upload Image</button>
            <input type="file" style="display:none" ref="fileInput"  accept="image/*" @change="onFilePicked">
            <img :src="model.imageUrl" height="200">
            
            <div class="input__field">
              <label class="label" for="title">Description</label>
              <vue-editor v-model="model.description"></vue-editor>
              <transition name="error-validation">              
              <span  class="form-error" v-if="errors.has('description')">
                {{ errors.first('description') }}
              </span>
              </transition>
            </div>

            <button type="submit" class="btn btn-primary">Create Festival</button>

          </form>
        </div>
      </div> 
    </div>
  </section>
</template> 

<script>

import Datepicker from 'vuejs-datepicker'
import alert from '../../Shared/alert.vue'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    Datepicker,
    VueEditor,
    alert
  },
  data () {
    return {
      content: '',
      activeAlert: false,
      alertContent: 'Festival',
      model: {
        title: '',
        creatorFestival: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        image: null
      }
    }
  },
  methods: {
    onCreateFestival () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (!this.model.image) {
            return
          }
          const festivalData = {
            title: this.model.title,
            creatorFestival: this.model.creatorFestival,
            location: this.model.location,
            image: this.model.image,
            description: this.model.description,
            date: this.model.date
          }
          this.$store.dispatch('createFestival', festivalData)
          setTimeout(() => {
            this.onShowAlert()
          }, 1000)
        }
      })
    },
    onShowAlert () {
      this.activeAlert = true
      setTimeout(() => {
        this.activeAlert = false
        this.$router.push('/profile')
      }, 2000)
    },
    onUploadFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name

      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.model.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.model.image = files[0]
    }
  }
}
</script>

<style lang="scss" scoped>
  
.error-validation-enter-active{
  transition: opacity .5s
}
.error-validation-enter, .error-validation-leave-to {
  opacity: 0;
  transition: opacity .5s
}
</style>
