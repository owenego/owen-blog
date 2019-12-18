<template>
    <div class="blog">
        <h3>
            <v-btn class="mr-4 mb-4" @click="goPostPage" v-if="userInfo.name"
                >POST NEW BLOG</v-btn
            >
        </h3>

        <v-simple-table fixed-header v-if="blogs.length">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Author</th>
                        <th class="text-left">Category</th>
                        <th class="text-left">Tags</th>
                        <th class="text-left" v-if="userInfo.name">Operate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(blog, index) in blogs" :key="`${blog.title}-${index}`">
                        <td>
                            <a :href="`#/blog/${blog._id}`">{{ blog.title }}</a>
                        </td>
                        <td>{{ blog.category }}</td>
                        <td>{{ blog.author }}</td>
                        <td>{{ blog.tags.map(o => o.title).join() }}</td>
                        <td v-if="userInfo.name">
                            <v-btn small color="error" @click="remove(blog._id)"
                                >DELETE</v-btn
                            >
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <template v-else>
            No blog!
        </template>
    </div>
</template>

<script>
import http from "../utils/http";
import { mapGetters } from "vuex";

export default {
    name: "blog-list",
    data() {
        return {
            blogs: []
        };
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    methods: {
        goPostPage() {
            this.$router.push("/blog/post");
        },
        async fetch() {
            const { data } = await http.get("/blog");
            this.blogs = data;
        },
        async remove(_id) {
            if (!confirm("Really delete this blog?")) return;
            const { success } = await http.delete("/blog", { data: { _id } });
            if (success) {
                await this.fetch();
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