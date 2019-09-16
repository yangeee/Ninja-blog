import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

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
          path: 'items/edit/:id',
          component: ItemEdit,
          props: true
        },
        {
          path: 'items/create',
          component: ItemEdit
        },
        {
          path: 'items/list',
          component: ItemList
        }
      ]
    }
  ]
})
