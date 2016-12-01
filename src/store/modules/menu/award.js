import {lazyLoading} from './lazyLoading'

export default {
  meta: {
    label: '领奖&晒单',
    icon: 'fa-laptop',
    expanded: true
  },

  children: [
    {
      name: '领奖',
      path: '/award',
      component: lazyLoading('ui/Buttons')
    },
    {
      name: '晒单',
      path: '/show',
      component: lazyLoading('ui/Form')
    }
  ]
}
