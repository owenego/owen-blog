<template>
    <div class="home">
        <template v-if="newslist.length">
            <v-card
                class="mx-auto mb-30"
                v-for="(news, index) in newslist"
                :key="index"
            >
                <v-card-title>
                    {{ news.source.name }}
                    <v-divider class="mx-4" vertical></v-divider>
                    <span class="headline font-weight-bold"
                        ><a :href="`${news.url}`" target="_blank">{{
                            news.title
                        }}</a></span
                    >
                </v-card-title>

                <v-card-text class="title font-weight-light ellipsis">
                    {{ news.description }}
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ `${news.author},` }}
                                {{ `${news.publishedAt}` | formatDate }}
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-row justify="end">
                            <v-chip
                                outlined
                                v-for="(tag, tagIndex) in news.tags"
                                :key="tagIndex"
                                >{{ tag.title }}</v-chip
                            >
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </template>
        <template v-else>
            No news!
        </template>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "news",
    data() {
        return {
            newslist: []
        };
    },
    async mounted() {
        const today = new Date();
        const before = new Date(Date.now() - 7 * 1000 * 60 * 60 * 24); //one week ago
        const from = [
            before.getFullYear(),
            before.getMonth()+1,
            before.getDate()
        ].join("-");
        const to = [
            today.getFullYear(),
            today.getMonth()+1,
            today.getDate()
        ].join("-");

        const url = "https://newsapi.org/v2/everything";
        const params = {
            q: "apple",
            from,
            to,
            sortBy: "popularity",
            apiKey: "fb3ab50fc0054687820fc3fb294e0dd0"
        };
        const { data } = await axios({
            method: "get",
            url,
            params
        });
        this.newslist = data.articles;
    }
};
</script>
<style scoped>
.home a {
    text-decoration: none;
}
</style>