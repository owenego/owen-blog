<template>
    <div class="blog">
        <h3>
            <v-btn class="mr-4 mb-4" @click="goBlogList">GO BLOG LIST</v-btn>
        </h3>

        <v-card class="mx-auto">
            <v-card-title>
                {{ blog.category }}
                <v-divider class="mx-4" vertical></v-divider>
                <span class="headline font-weight-bold">{{ blog.title }}</span>
            </v-card-title>

            <v-card-text
                class="title font-weight-light"
                v-html="blog.body && blog.body.replace('\n', '<br/><br/>')"
            >
            </v-card-text>

            <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ `${blog.author},` }}
                            {{ `${blog.date}` | formatDate }}
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center">
                        <v-chip
                            outlined
                            v-for="(tag, tagIndex) in blog.tags"
                            :key="tagIndex"
                            >{{ tag.title }}</v-chip
                        >
                    </v-row>
                </v-list-item>
            </v-card-actions>

            <v-row v-if="userInfo.name">
                <v-col cols="6" md="4">
                    <v-text-field
                        v-model="review"
                        label="New review"
                        required
                    ></v-text-field
                ></v-col>
                <v-col cols="6" md="4">
                    <v-btn @click="addReview">Add review</v-btn></v-col
                >
            </v-row>

            <v-list
                subheader
                three-line
                v-if="blog.reviews && blog.reviews.length"
            >
                <v-subheader>Reviews:</v-subheader>
                <p
                    class="review"
                    v-for="(review, index) in blog.reviews"
                    :key="index"
                >
                    {{ `${review.author}/` }}
                    {{ `${review.date}` | formatDate }}
                    {{ `- ${review.review}` }}
                </p>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import http from "../utils/http";
import { mapGetters } from "vuex";

export default {
    name: "blog",
    data() {
        return {
            review: "",
            blog: {}
        };
    },
    computed: {
        _id() {
            return this.$route.params.id;
        },
        ...mapGetters(["userInfo"])
    },
    methods: {
        goBlogList() {
            this.$router.push("/");
        },
        async getBlog() {
            const { data } = await http.get(`/blog/${this._id}`);
            this.blog = data;
        },
        async addReview() {
            const { success } = await http.post("/blog/review", {
                _id: this._id,
                author: this.userInfo.name,
                review: this.review
            });
            if (success) {
                alert("Succeed.");
                this.review = "";
                await this.getBlog();
            } else {
                alert("Fail.");
            }
        }
    },
    async mounted() {
        await this.getBlog();
    }
};
</script>