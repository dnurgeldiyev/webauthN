<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" xs="10" sm="7" md="5" lg="4" xl="3">
            <v-card class="elevation-8">
              <v-form @submit.prevent="login" :disabled="isDisabled">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Giriş</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-alert type="error" v-model="alert" dismissible>
                    {{ alertMessage }}
                  </v-alert>
                  <v-text-field
                      label="Ulanyjy ady"
                      name="username"
                      v-model="username"
                      placeholder="Ulanyjy adyny giriziň"
                      :rules="usernameRules"
                      prepend-icon="mdi-account"
                      type="text"
                  />
                  <v-text-field
                      label="Açarsöz"
                      name="password"
                      v-model="password"
                      prepend-icon="mdi-lock"
                      type="password"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn type="submit" :loading="isDisabled" color="primary"
                  >Giriş
                  </v-btn>
                  <v-btn @click="loginWebAuthN" color="primary"
                  >WebAuthN
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import {getAssertion} from "@/services/webauthn";

export default {
  name: "Login",
  data() {
    return {
      alert: false,
      alertMessage: null,
      isDisabled: false,
      username: null,
      password: null,
      usernameRules: [(v) => !!v || "Ulanyjy adyňyzy giriziň"],
    };
  },
  methods: {
    login() {
      console.log("form submitted");
      this.isDisabled = true;
      this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password,
          })
          .then(() => {
            console.log("Login success");
            this.$router.push({name: "home"});
          })
          .catch((err) => {
            console.log("Error logging in", err);
            if (err.status === 401) {
              this.alert = true;
              this.alertMessage = "Ulanyjy ady ýa-da açarsözi nädogry";
            }
          })
          .finally(() => {
            this.isDisabled = false;
          });
    },
    loginWebAuthN() {
      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);

      axios.post("/api/user/get-assertion", formData).then(
          (assertionOptions) => {
            let assert = assertionOptions
            getAssertion(assert.data.data)
            console.log("Login success");
          })
          .catch((error) => {
            console.warn(error.message);
          })
          .finally(() => {
          });
    },

  },
};
</script>
