import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WeekView from '@/views/WeekView.vue'
import DayView from '@/views/DayView.vue'
import { upperFirst } from '@/helpers/strings'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/week',
      name: 'week',
      component: WeekView,
      meta: {
        title: 'Week'
      }
    },
    {
      path: `/day/:dayName`,
      component: DayView,
      props: true,
      meta: {
        title: `Day:`
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title

  if (to.params.dayName) {
    title = `${title} ${upperFirst(to.params.dayName)}`
  }

  document.title = `${title} | Dose Me`

  next()
})

export default router
