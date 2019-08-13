<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <div class="page-header">Manage Customers</div>
    <input type="text" class="form-control" placeholder="Enter Username" v-model="filterInput"/>
    <br/>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email Address</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filterBy(customers, filterInput)">
          <td>{{ customer.username }}</td>
          <td>{{ customer.email_address }}</td>
          <td><router-link class="btn btn-primary" v-bind:to="'/customer/' + customer.email_address">View</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from "./Alert"
  export default {
    name: 'customers',
    data () {
      return {
        customers: [],
        alert: "",
        filterInput: ""
      }
    },
    methods: {
      fetchCustomers(){
        this.$http.get("http://localhost/sqyte/public/api/users")
          .then(function(response){
            this.customers = response.body.data
          })
      },
      filterBy(list, value){
        return list.filter(function(customer){
          return customer.username.indexOf(value) > -1
        })
      }
    },
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert
      }
      this.fetchCustomers()
    },
    updated: function(){
      //this.fetchCustomers()
    },
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
