<template>
  <div class="details container">
    <router-link to="/">Back</router-link>
    <router-link v-bind:to="'/customer/edit/' + customer.email_address">Update Customer</router-link>
    <span class="pull-right"><button class="btn btn-danger" v-on:click="deleteCustomer">Delete</button></span>
    <ul class="list-group">
      <li class="list-group-item active">Customer Details</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>Email Address: {{ customer.email_address }}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>Username: {{ customer.username }}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>Full Name: {{ customer.full_name }}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span>Phone Number: {{ customer.phone_number }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'customerdetails',
  data () {
    return {
      email_address: "",
      customer: {}
    }
  },
  methods: {
    fetchCustomer(){
      this.$http.post("http://localhost/sqyte/public/api/fetch_single_user", {email_address: this.email_address})
        .then(function(response){
          //console.log(response.body.data.user_id)
          if(response.body.status == -1){
            this.$router.push({path: "/", query: {alert: "Sorry, Customer was not found"}})
          }else{
            this.customer = response.body.data
          }
        })
    },
    deleteCustomer(){
      //console.log(this.customer.user_id)
      this.$http.post("http://localhost/sqyte/public/api/delete_user", {user_id: this.customer.user_id})
        .then(function(response){
          if(response.body.status == 1){
            this.$router.push({path: "/", query: {alert: "Customer Deleted!"}})
          }else{
            alert(response.body.message)
          }
        })
      }
  },
  created: function(){
    this.email_address = this.$route.params.email_address
    this.fetchCustomer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
