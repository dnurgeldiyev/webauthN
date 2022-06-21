<template>
  <v-app>
    <v-system-bar app class="pl-6 pr-0 py-10 primary white--text">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              height="80"
              min-width="200"
              class="darken-1 primary"
          >
            <v-avatar size="35" class="ma-2">
              <!--              <img src="mdi-account-outline" alt="AV"/>-->
              <v-icon color="white" size="30">
                mdi-account-circle-outline
              </v-icon>
            </v-avatar>
            Dowran
            <v-icon right size="25"> mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="actionFunc(item.action)"
          >
            <v-list-item-title>
              <v-icon>
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-system-bar>


    <v-main>
      <v-container fluid>
        <v-btn @click="makeCredential">sad</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ApiMixin from "@/mixin/ApiMixin";
import axios from "axios";
import base64js from "@/base64";
import {makeCredential} from "@/services/webauthn";

export default {
  name: "Base",
  mixins: [ApiMixin],
  data() {
    return {
      username: "",
      items: [
        {
          title: "Çykmak",
          icon: "mdi-exit-to-app",
          action: "handleLogout",
        },
      ],
      drawer: true,
      dialogConfirm: false,
    };
  },
  methods: {
    actionFunc(arg) {
      if (arg === "handleLogout") {
        this.$store.dispatch('logout');
        this.handleLogout();
      }
    },
    handleLogout() {
      this.fetchAPI({
        action: "user/logout",
        data: null,
      })
          .then(() => {
            this.$router.push("login");
          })
          .catch((error) => {
            console.warn(error.message);
            this.$router.push("login");
          });
    },
    makeCredential() {
       axios.post("/api/user/request-credential").then(
          async (makeCredentialOptions) => {
            let cred = makeCredentialOptions
            await makeCredential(cred.data.data)
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
