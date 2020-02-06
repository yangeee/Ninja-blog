import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroesEdit from './views/HeroesEdit.vue'
import HeroesList from './views/HeroesList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'categories/create',
          component: CategoryEdit
        },
        {
          path: 'categories/list',
          component: CategoryList
        },
        {
          path: 'categories/edit/:id',
          component: CategoryEdit,
          props: true
        },
        {
          path: 'items/create',
          component: ItemEdit
        },
        {
          path: 'items/list',
          component: ItemList
        },
        {
          path: 'items/edit/:id',
          component: ItemEdit,
          props: true
        },
        {
          path: 'heroes/create',
          component: HeroesEdit
        },
        {
          path: 'heroes/list',
          component: HeroesList
        },
        {
          path: 'heroes/edit/:id',
          component: HeroesEdit,
          props: true
        }
      ]
    }
  ]
})
