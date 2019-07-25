<template>
    <div class="text-xs-center">
        <v-progress-circular
            class="logout__progress"
            :size="120"
            :width="8"
            indeterminate
            color="primary"
        />
    </div>
</template>

<script>
    import storage from '../store/storage';

    export default {
        beforeCreate: async function () {
            await storage.dispatch('logout').then(() => {
                this.$router.replace('/login');
            });
        }
    }
</script>