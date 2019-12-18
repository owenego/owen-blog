<template>
    <div class="blog-form">
        <h3>Post a new blog</h3>
        <form>
            <v-text-field
                v-model="title"
                :counter="50"
                name="title"
                label="Title"
            ></v-text-field>
            <v-textarea v-model="body" label="Blog Body"></v-textarea>
            <v-select
                v-model="category"
                :items="categories"
                class="category-select"
                label="Category"
            ></v-select>
            <v-combobox
                v-model="tags"
                :items="tagItems"
                chips
                clearable
                label="Tags"
                class="tags-select"
                multiple
                solo
            >
                <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove(item)"
                    >
                        <strong>{{ item }}</strong
                        >&nbsp;
                        <span>(interest)</span>
                    </v-chip>
                </template>
            </v-combobox>
            <!-- <v-checkbox
                v-model="hidden"
                :value="true"
                label="Hidden"
                type="checkbox"
            ></v-checkbox> -->

            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
        </form>
    </div>
</template>

<script>
import http from "../utils/http";
import { mapGetters } from "vuex";

export default {
    data: () => ({
        title: "",
        body: "",
        category: null,
        categories: [],
        hidden: false,
        tagItems: ["paper   ", "news", "blog", "twitter"],
        tags: []
    }),
    computed: {
        ...mapGetters(["userInfo"])
    },
    async mounted() {
        const { data } = await http.get("/category");
        this.categories = data.map(o => o.title);
    },

    methods: {
        async submit() {
            const { success } = await http.post("/blog", {
                author: this.userInfo.name,
                title: this.title,
                body: this.body,
                category: this.category,
                hidden: false,
                tags: this.tags.join()
            });
            if (success) {
                alert("Succeed.");
                this.$router.push("/blog");
            } else {
                alert("Fail.");
            }
        },
        remove(item) {
            this.tags.splice(this.tags.indexOf(item), 1);
            this.tags = [...this.tags];
        },
        clear() {
            this.title = "";
            this.body = "";
            this.tags = [];
            this.category = null;
            this.hidden = false;
        }
    }
};
</script>