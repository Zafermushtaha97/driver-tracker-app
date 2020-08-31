<template>
    <div class="main">
        <div class="pt-4">
            <h2 class="font-zilla">LOCATION TRACKER APP DRIVER</h2>
        </div>
        <!-- <div class="ui  image rounded fluid">
                <img src='../assets/map.jpg'>
        </div> -->
    </div>
</template>


<script>
export default {
    name:'mainpage'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:ital@1&display=swap');
    .pt-4{
        padding-top:6em;
        
    }
    .font-zilla{
            font-family: 'Zilla Slab', serif;
            font-size: 3em;
            color: #333447;
    }
    .main{
    background-image: url(../assets/map.jpg);
    height: 790px;
    background-position: center;
    background-size: cover;

    }
</style>