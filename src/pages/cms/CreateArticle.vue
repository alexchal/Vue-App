<template>
  <section class="createArticle">
  <alert :class="{alert__isActive: activeAlert}" :alertText="this.alertContent" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-6">
          <h1 class="section-title">Create a new Article</h1>

          <datepicker v-model="model.date"></datepicker>

          <form @submit.prevent="onCreateArticle">

            <div class="input__field">
              <label class="label" for="author">Author</label>
              <input v-model="model.author" v-validate="'required'" name="author" type="text" class="input" placeholder="author" >
            
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
            <input type="file" style="display:none" ref="fileInput" v-validate="'required'" accept="image/*" @change="onFilePicked">
            <img :src="model.imageUrl" height="200">
            <transition name="error-validation">              
              <span  class="form-error" v-if="errors.has('location')">
                {{ errors.first('location') }}
              </span>
            </transition>
            
            <div class="input__field">
              <label class="label" for="title">Description</label>
              <vue-editor v-model="model.description"></vue-editor>
              <!--<textarea v-model="model.description" placeholder="add multiple lines" v-validate="'required'" name="description"></textarea>-->
              <transition name="error-validation">              
              <span  class="form-error" v-if="errors.has('description')">
                {{ errors.first('description') }}
              </span>
              </transition>
            </div>

            <button type="submit" class="btn btn-primary">Create Article</button>

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
      alertContent: 'Article',
      model: {
        title: '',
        author: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        image: null
      }
    }
  },
  methods: {
    onCreateArticle () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // fix bug of vue-editor for null description its adds <p><br/></p>
          const nullDescription = '<p><br><p>'
          if (!this.model.image || this.model.description === nullDescription) {
            return
          }
          const articleData = {
            title: this.model.title,
            author: this.model.author,
            location: this.model.location,
            image: this.model.image,
            description: this.model.description,
            date: this.model.date
          }
          this.$store.dispatch('createArticle', articleData)
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

<style scoped>

</style>
