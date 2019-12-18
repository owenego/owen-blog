<template>
    <div class="category">
        <v-form v-model="valid">
            <v-row v-if="userInfo.name">
                <v-col cols="6" md="4">
                    <v-text-field
                        v-model="category"
                        label="New category"
                        required
                    ></v-text-field
                ></v-col>
                <v-col cols="6" md="4">
                    <v-btn @click="addCategory">Add new category</v-btn></v-col
                >
            </v-row>
        </v-form>
        <template v-if="categories.length">
            <v-chip
                :close="!!userInfo.name"
                v-for="(category, index) in categories"
                :key="index"
                @click:close="remove(category._id)"
                >{{ category.title }}</v-chip
            >

            <v-simple-table fixed-header v-if="blogsCatg.length" class="mt-4">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Category</th>
                            <th class="text-left">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="catg in blogsCatg" :key="catg.category">
                            <td>
                                <a :href="`#/?category=${catg.category}`">{{
                                    catg.category
                                }}</a>
                            </td>
                            <td>{{ catg.count }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </template>
        <template v-else>
            No category!
        </template>
    </div>
</template>

<script>
import http from "../utils/http";
import { mapGetters } from "vuex";

export default {
    name: "category",
    data() {
        return {
            valid: false,
            category: "",
            blogsCatg: [],
            categories: []
        };
    },
    computed: {
        ...mapGetters(["userInfo"])
    },    
    methods: {
        async remove(_id) {
            const { success } = await http.delete("/category", {
                data: { _id }
            });

            if (success) {
                await this.fetch();
                alert("Succeed.");
            } else {
                alert("Fail.");
            }
        },
        async fetch() {
            const { data } = await http.get("/category");
            this.categories = data;
            const { data: blogsCatg } = await http.get("/category/blogs");
            this.blogsCatg = blogsCatg;
        },
        async addCategory() {
            const title = this.category;
            const { success } = await http.post("/category", { title });

            if (success) {
                await this.fetch();
                this.category = "";
                alert("Succeed.");
            } else {
                alert("Fail.");
            }
        }
    },
    mounted() {
        this.fetch();
    }
};
</script>