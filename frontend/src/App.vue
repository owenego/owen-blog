<template>
    <v-app>
        <!-- top app bar, navigator / user name / logout -->
        <v-app-bar app dark>
            <v-tabs centered ref="tabs">
                <v-tab v-for="(nav, index) in navlist" :key="index">
                    <router-link :to="nav.path">{{ nav.name }}</router-link>
                </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <span class="weather">{{ computedWeather }}</span>
            <span class="nav-user-text">{{ userInfo.name }}</span>
            <i
                class="mdi mdi-logout-variant"
                title="logout"
                v-if="userInfo.name"
                @click="logout"
            ></i>
            <v-btn text @click="goLoginPage" v-else>login</v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
    name: "App",
    data: () => ({
        weather: null,
        navlist: [
            { path: "/home", name: "Home" },
            { path: "/news", name: "News" },
            { path: "/category", name: "Category" },
            { path: "/blog", name: "Blog" }
        ]
    }),
    watch: {
        $route: {
            handler(newVal, oldVal) {
                const value = this.navlist.findIndex(
                    o => o.path === newVal.path
                );

                this.$nextTick(() => {
                    this.$refs.tabs.internalLazyValue =
                        value === -1 ? 3 : value;
                });
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters(["userInfo"]),
        computedWeather() {
            if (this.weather) {
                const { cityName, temp, weather } = this.weather;
                return `${cityName},${temp}/${weather}`;
            }
            return "";
        }
    },
    mounted() {
        axios({
            method: "get",
            url:
                "https://api.openweathermap.org/data/2.5/weather?q=Waterford%2Cie&APPID=c7217879b7cbce95ebaebb515fd15045"
        })
            .then(data => {
                const { id, name, main, weather } = data.data;
                this.weather = {
                    cityId: id,
                    cityName: name,
                    temp: main.temp + "℉",
                    weather: weather[0].main,
                    desc: weather[0].description
                };
            })
            .catch(err => {
                this.weather = null;
            });
    },
    methods: {
        goLoginPage() {
            this.$router.push("/login");
        },
        async logout() {
            await this.$store.dispatch("logout");
        }
    }
};
</script>

<style scoped>
.nav-user-text {
    margin: auto 10px;
}
.v-application a {
    color: #fff;
    text-decoration: none;
}
/deep/ .v-tabs-slider-wrapper {
    color: transparent;
    display: none;
}
.v-tab--active {
    background-color: #292929;
}
</style>
