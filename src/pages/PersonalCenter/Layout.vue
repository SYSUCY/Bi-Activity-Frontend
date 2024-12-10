<template>
    <div>
        <header>
            <h1>
                学生个人中心
            </h1>
        </header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: "PersonalCenterLayout"
};
</script>

<style scoped>
/* 暂时不用写样式，先确认功能 */
</style>