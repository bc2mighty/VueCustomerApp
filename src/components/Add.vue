<template>
  <div class="add container">
    <h3 class="page-header">Add Customer</h3>
    <h5 class="alert alert-danger" v-if="error">{{ errorMessage }}</h5>
    <form v-on:submit="addCustomer">
      <div class="well">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label>Email Address</label>
          <input type="text" placeholder="Email Address" class="form-control" v-model="customer.email_address"/>
        </div>
        <div class="form-group">
          <label>Username</label>
          <input type="text" placeholder="Username" class="form-control" v-model="customer.username"/>
        </div>
      </div>

      <div class="well">
        <h4>Customer Authentication</h4>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter Your Password" class="form-control" v-model="customer.password"/>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      customer: {},
      error: false,
      errorMessage:""
    }
  },
  methods: {
    addCustomer(e){
      e.preventDefault()
      if(!this.customer.email_address || !this.customer.username || !this.customer.password){
        console.log("Please provide all fields")
      }else{
        let newCustomer = {
          email_address: this.customer.email_address,
          username: this.customer.username,
          password: this.customer.password
        }

        this.$http.post('http://localhost/sqyte/public/api/add_new_user', newCustomer)
          .then(function(response){
            if(response.body.status == -1){
              this.error = true
              this.errorMessage = response.body.message
            }else{
              this.$router.push({path: '/', query: {alert: "Customer Added!"}})
            }
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
