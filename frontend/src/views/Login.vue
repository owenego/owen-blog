<template>
    <div class="login">
        <h3>Login</h3>
        <form>
            <v-text-field
                v-model="name"
                name="name"
                :counter="20"
                label="Please input your user name"
            ></v-text-field>

            <v-text-field
                v-model="password"
                append-icon="mdi-eye-off"
                type="password"
                name="password"
                label="Please input your password"
                counter
            ></v-text-field>

            <v-btn class="mr-4" @click="login">login</v-btn>
            <v-btn @click="goHomePage">return home page</v-btn>
        </form>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            name: "",
            password: ""
        };
    },
    methods: {
        goHomePage() {
            this.$router.push("/");
        },
        async login() {
            const name = this.name;
            const password = this.password;
            const { success } = await this.$store.dispatch('login', {name, password})
            if (success) {
                alert("Login succeed.");
                this.$router.go(-1);
            } else {
                alert("Login fail.");
            }
        }
    }
};
</script>
