<template>
  <div class="edit container">
    <h3 class="page-header">Edit Profile</h3>
    <h5 class="alert alert-danger" v-if="error">{{ errorMessage }}</h5>
    <form v-on:submit="updateCustomer">
      <div class="well">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label>Email Address</label>
          <input type="text" value="this.customer.email_address" placeholder="Email Address" class="form-control" v-model="customer.email_address"/>
        </div>
        <div class="form-group">
          <label>Username</label>
          <input type="text" value="this.customer.username" placeholder="Username" class="form-control" v-model="customer.username"/>
        </div>
      </div>

      <div class="well">
        <h4>Customer Other Info</h4>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" value="this.customer.full_name" placeholder="Full Name" class="form-control" v-model="customer.full_name"/>
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="text" value="this.customer.phone_number" placeholder="Phone Number" class="form-control" v-model="customer.phone_number"/>
        </div>
      </div>

      <div class="well">
        <h4>Customer Location</h4>
        <div class="form-group">
          <label>Location</label>
          <input type="text" value="this.customer.location" placeholder="Enter Your Location" class="form-control" v-model="customer.user_location"/>
        </div>

        <div class="form-group">
          <label>Gender</label>
          <select class="form-control" v-model="customer.gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <input type="hidden" v-model="customer.user_id" value="this.customer.user_id"/>

        <div class="form-group">
          <label>About</label>
          <textarea class="form-control" v-model="customer.about_me">{{ this.customer.about_me }}</textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      customer: {},
      email_address: "",
      error: false,
      errorMessage:""
    }
  },
  methods: {
    fetchCustomer(){
      this.$http.post("http://localhost/sqyte/public/api/fetch_single_user", {email_address: this.email_address})
        .then(function(response){
          this.customer = response.body.data
        })
    },
    updateCustomer(e){
      e.preventDefault()
      if(!this.customer.email_address || !this.customer.username || !this.customer.phone_number || !this.customer.full_name || !this.customer.gender || !this.customer.about_me || !this.customer.user_location){
        alert("Please provide all fields")
      }else{
        let customerDetails = {
          email_address: this.customer.email_address,
          full_name: this.customer.full_name,
          username: this.customer.username,
          user_location: this.customer.user_location,
          gender: this.customer.gender,
          phone_number: this.customer.phone_number,
          about_me: this.customer.about_me,
          user_id: this.customer.user_id
        }

        this.$http.post("http://localhost/sqyte/public/api/update_user_profile", customerDetails)
          .then(function(response){
            console.log(response)
            if(response.body.status == -1){
              this.error = true
              this.errorMessage = response.body.message
            }else{
              this.$router.push({path: "/", query: {alert: "Customer Details edited successfully"}})
            }
          })
      }
    }
  },
  created: function(){
    //console.log(this.$route.params.email_address)
    this.email_address = this.$route.params.email_address
    this.fetchCustomer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
