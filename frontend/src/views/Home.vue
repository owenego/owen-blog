<template>
    <div class="home">
        <template v-if="blogs.length">
            <v-card
                class="mx-auto mb-30"
                v-for="(blog, index) in blogs"
                :key="index"
            >
                <v-card-title>
                    {{ blog.category }}
                    <v-divider class="mx-4" vertical></v-divider>
                    <span class="headline font-weight-bold"
                        ><a :href="`#/blog/${blog._id}`">{{
                            blog.title
                        }}</a></span
                    >
                </v-card-title>

                <v-card-text class="title font-weight-light ellipsis">
                    {{ blog.body }}
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-content>
                        <v-list-item-title>
                            {{ `${blog.author},` }}
                            {{ `${blog.date }` | formatDate }}
                        </v-list-item-title>
                        </v-list-item-content>

                        <v-row justify="end">
                            <v-chip
                                outlined
                                v-for="(tag, tagIndex) in blog.tags"
                                :key="tagIndex"
                                >{{ tag.title }}</v-chip
                            >
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </template>
        <template v-else>
            No blog!
        </template>
    </div>
</template>

<script>
import http from "../utils/http";

export default {
    name: "home",
    data() {
        return {
            blogs: []
        };
    },
    async mounted() {
        const { category } = this.$route.query;
        const { data } = await http.get("/blog", { params: { category } });
        this.blogs = data;
    }
};
</script>
<style scoped>
.home a {
    text-decoration: none;
}
</style>