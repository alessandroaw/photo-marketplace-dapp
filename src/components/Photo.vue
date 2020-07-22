<template>
    <div class="col-md-4 col-sm-12">
        <div class="card mb-4 shadow-sm">
            <img :src="imgSrc" alt="" class="card-img-top img-fluid">
            <div class="card-body">
                <p class="card-text">
                    {{description}}
                </p>
                <p>
                    <a v-for="tag in tags" :key="tag"
                    href="#" class="badge badge-info mr-1">{{tag}}</a>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <strong class="text-muted">WEI {{price}}</strong>
                    <button class="btn btn-success">Beli</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
		imgSrc: String,
		description: String,
		tags: Array,
		price: Number,
	},
};
</script>
