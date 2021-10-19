<style> /* eslint-disable */ </style>
<template>
  <v-app class="bar-scroll">
    <Sidebar />
    <v-main id="main">
      <vue-weather api-key="152061a4ee1d36301a8e4d19749c58ef" units="uk" />
      <MenuButton />
      <div class="text-center">
        <FavoriteBar/>
      </div>
      <DialogButton
        v-model="dialog"
        scrollable
      >
        <template v-slot:button="{ on, attrs }">
          <v-btn class="todo-btn" v-bind="attrs" v-on="on">Todo List</v-btn>
        </template>
        <template v-slot:content>
          <TodoList />
        </template>
      </DialogButton>
    </v-main>
    <News/>
  </v-app>
</template>

<script>
import VueWeather from "vue-weather-widget"
import MenuButton from '@/components/menu/MenuButton'
import Sidebar from '@/components/menu/Sidebar'
import FavoriteBar from '@/components/menu/FavoriteBar'
import News from '@/components/news/News'
import DialogButton from '@/components/common/DialogButton'
import TodoList from '@/components/todo/TodoList'

export default {
  name: 'Home',
  components: {
    MenuButton,
    Sidebar,
    VueWeather,
    FavoriteBar,
    News,
    DialogButton,
    TodoList
  },
 data: () => ({
   dialog: null,
    imageArray: ['https://blog.depositphotos.com/wp-content/uploads/2017/07/How-to-Use-Landscape-Photography-in-Creative-Campaigns-1.jpg.webp', 'https://cdn.wallpapersafari.com/66/39/kLruz3.jpg', 'https://cdn.wallpapersafari.com/83/40/mvC6K2.jpeg', 'https://cdn.wallpapersafari.com/69/92/AjU6ex.jpg',
                  'https://cdn.wallpapersafari.com/11/46/ftBo0W.jpg', 'https://cdn.wallpapersafari.com/67/14/5moXrk.jpg', 'https://cdn.wallpapersafari.com/29/52/uqmOHw.jpg', 'https://cdn.wallpapersafari.com/95/73/Ya2jUH.jpg',
                   'https://cdn.wallpapersafari.com/38/36/s4hZnB.jpg', 'https://cdn.wallpapersafari.com/17/62/UHbR29.jpg', 'https://cdn.wallpapersafari.com/27/47/FNqRZi.jpg', 'https://cdn.nimbusthemes.com/2017/09/09233341/Free-Nature-Backgrounds-Seaport-During-Daytime-by-Pexels.jpeg',
                    'https://cdn.wallpapersafari.com/33/88/CfmHT5.jpg', 'https://cdn.wallpapersafari.com/77/9/WEnNaJ.jpg', 'https://cdn.wallpapersafari.com/34/69/7RVdHg.jpg', 'https://cdn.wallpapersafari.com/33/25/l6aGfq.jpeg',
                      'https://cdn.wallpapersafari.com/33/88/CfmHT5.jpg', 'https://cdn.wallpapersafari.com/4/50/P7Sbwo.jpg', 'https://cdn.wallpapersafari.com/27/53/JDzB8f.jpg', 'https://cdn.wallpapersafari.com/41/98/QU7hCm.jpg', 'https://cdn.wallpapersafari.com/28/3/iAjhUP.jpg', 'https://blog.depositphotos.com/wp-content/uploads/2017/07/On-the-road-2.jpg.webp',
                        'https://blog.depositphotos.com/wp-content/uploads/2017/07/Floral-patterns-1.jpg.webp', 'https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821__340.jpg', 'https://img.wallpapersafari.com/desktop/1920/1080/94/20/52yFZq.jpg', 'https://webneel.com/wallpaper/sites/default/files/images/08-2018/3-nature-wallpaper-mountain.jpg',
                          'https://lh3.googleusercontent.com/proxy/UMkPvPDwH5IyzBqwF6iX3akvVvHEzY6mxexHMC-XU2JwvzEJ1IhinKVKRi2wJRjUBTW9xojcJ1v75RuVNOCioY1UWY56peS21w7yZg43FtrwmuMKXj32mhgL8E6IAIIhf0NnQBh20YeLf7P2N5syb3N3tkmxLhQ' , 'https://c4.wallpaperflare.com/wallpaper/687/393/115/panorama-nature-sun-tree-wallpaper-preview.jpg', 'https://data.whicdn.com/images/250339926/original.jpg', 'https://images.alphacoders.com/696/696961.jpg',
                            'https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&w=1000&q=80', 'https://images.freeimages.com/images/large-previews/f2d/foggy-train-tracks-1223334.jpg', 'https://s1.1zoom.me/b5050/949/430357-Kycb_3840x2400.jpg', 'https://images.unsplash.com/photo-1542566369965-99f2666b2d0f?ixlib=rb-1.2.1&w=1000&q=80'],
  }),
  mounted() {
    setInterval(this.changeImage, 60 * 10 * 1000 ); // 5 Minutes
  },
  methods: {
    changeImage() {
      const i = Math.floor((Math.random() * 33));
      document.getElementById('main').style.backgroundImage = `url('${this.imageArray[i]}')`;
    },
  },
};
</script>

<style>

* {
  box-sizing: border-box;

}

.container {
  max-width: 700px;
  margin: 0 auto;
  background: #FFF;


}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;

}






* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'monsterrat', sans-serif;
}

#main {
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0, 0, 0, 0.75));
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  min-height: 100vh;
}

  search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 25%;
  padding: 15px;
  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25) ;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;

}

.location-box .location {
  color:#FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0,0.25);
}

.location-box .date {
  color:#FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
}

.todo-btn {
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: 3rem;
}

</style>
